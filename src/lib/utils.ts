import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import db from "./db";
import { emailVerificationCodes } from "./db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// From https://github.com/colinhacks/zod/discussions/839#discussioncomment-8142768
export function getZodEnumFromObjectKeys<
  TI extends Record<string, any>,
  R extends string = TI extends Record<infer R, any> ? R : never,
>(input: TI): z.ZodEnum<[R, ...R[]]> {
  const [firstKey, ...otherKeys] = Object.keys(input) as [R, ...R[]];
  return z.enum([firstKey, ...otherKeys]);
}

export async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  await db
    .delete(emailVerificationCodes)
    .where(eq(emailVerificationCodes.userId, userId));
  const code = generateRandomString(8, alphabet("0-9"));
  await db.insert(emailVerificationCodes).values({
    userId: userId,
    userEmail: email,
    code,
    expiresAt: createDate(new TimeSpan(15, "m")), // 15 minutes
  });

  return code;
}

// TODO needs to be a drizzleORM transaction
// async function verifyVerificationCode(
//   user: User,
//   code: string,
// ): Promise<boolean> {
//   await db.beginTransaction();
//   const databaseCode = await db
//     .table("email_verification_code")
//     .where("user_id", "=", user.id)
//     .get();
//   if (!databaseCode || databaseCode.code !== code) {
//     await db.commit();
//     return false;
//   }
//   await db.table("email_verification_code").where("id", "=", code.id).delete();
//   await db.commit();

//   if (!isWithinExpirationDate(databaseCode.expires_at)) {
//     return false;
//   }
//   if (databaseCode.email !== user.email) {
//     return false;
//   }
//   return true;
// }
