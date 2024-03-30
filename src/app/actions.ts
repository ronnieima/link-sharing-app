"use server";
import { lucia, validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { links, users } from "@/lib/db/schema";
import { loginFormSchema } from "@/lib/zod";
import { NeonDbError } from "@neondatabase/serverless";
import { eq, sql } from "drizzle-orm";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export async function registerUser(email: string, password: string) {
  const result = loginFormSchema.safeParse({ email, password });

  if (!result.success) {
    return { error: "Invalid email or password" };
  }

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);
  try {
    await db.insert(users).values({
      id: userId,
      email,
      hashedPassword,
    });
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    if (error instanceof NeonDbError) {
      switch (error.code) {
        case "23505":
          return { error: "Email already registered" };
        default:
          return {
            error: "Database error: Failed to create new account.",
          };
      }
    }
    return { error: "An unknown error ooccured" };
  }
  return redirect("/");
}

export async function loginUser(email: string, password: string) {
  const result = loginFormSchema.safeParse({ email, password });

  if (!result.success) {
    return { error: "Invalid email or password" };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (!user) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid emails from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid emails.
    // However, valid emails can be already be revealed with the signup page
    // and a similar timing issue can likely be found in password reset implementation.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If emails/usernames are public, you may outright tell the user that the username is invalid.
    return { error: "Invalid email or password" };
  }

  const validPassword = await new Argon2id().verify(
    user.hashedPassword,
    password,
  );
  if (!validPassword) {
    return { error: "Invalid email or password" };
  }
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}

export async function logoutUser() {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/login");
}

export async function addLink(userId: string) {
  const MAX_LINKS_AMOUNT = 5;

  try {
    const userLinks = await db.execute(sql`
    SELECT COUNT(*)
    FROM ${links}
    WHERE ${links.userId} = ${userId}
  `);

    const currentRowCount = parseInt(userLinks.rows[0].count as string);
    if (currentRowCount >= MAX_LINKS_AMOUNT)
      return {
        error: `Maximum amount of links (${MAX_LINKS_AMOUNT}) reached.`,
      };

    await db.insert(links).values({
      userId,
    });
    revalidatePath("/customize", "page");
    return { message: `Row added successfully` };
  } catch (error) {
    return { error: "Unknown error ooccured" };
  }
}

export async function getLinks(userId: string) {
  try {
    const userLinks = await db.execute(sql`
      SELECT *
      FROM ${links}
      WHERE ${links.userId} = ${userId}
      ORDER BY ${links.createdAt}
    `);

    return userLinks.rows;
  } catch (error) {
    return { error: "Unknown error ooccured" };
  }
}

export async function updateLink(linkId: string, platform: string) {
  try {
    await db
      .update(links)
      .set({
        platform,
      })
      .where(eq(links.id, linkId));
    revalidatePath("/customize");
  } catch (error) {
    return { error: "Failed to update link" };
  }
}

export async function removeLink(linkId: string) {
  try {
    await db.execute(sql`
      DELETE FROM ${links}
      WHERE ${links.id} = ${linkId}
    `);
    revalidatePath("/customize");
  } catch (error) {
    return { error: "Failed to remove link" };
  }
}
