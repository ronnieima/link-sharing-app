"use server";
import { lucia } from "@/lib/auth";
import { generateId } from "lucia";
import { users } from "@/lib/db/schema";
import { Argon2id } from "oslo/password";
import { eq } from "drizzle-orm";
import db from "@/lib/db";
import { cookies } from "next/headers";

export async function registerUser(email: string, password: string) {
  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);
  console.log(userId);
  await db.insert(users).values({
    id: userId,
    email,
    hashedPassword,
  });
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie);
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
