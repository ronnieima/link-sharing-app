"use server";
import { lucia } from "@/lib/auth";
import db from "@/lib/db";
import { users } from "@/lib/db/schema";
import { loginFormSchema } from "@/lib/zod";
import { NeonDbError } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";
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
    cookies().set(sessionCookie);
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
    return { error: "Failed to create new account." };
  }
}

export async function loginUser(email: string, password: string) {
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
    return new Response("Invalid email or password", {
      status: 400,
    });
  }

  const validPassword = await new Argon2id().verify(
    user.hashedPassword,
    password,
  );
  if (!validPassword) {
    return new Response("Invalid email or password", {
      status: 400,
    });
  }
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": sessionCookie.serialize(),
    },
  });
}
