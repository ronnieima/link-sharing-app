"use server";

import db from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function updateProfile(
  firstName: string,
  lastName: string,
  email: string,
  userId: string,
) {
  try {
    await db
      .update(users)
      .set({ firstName, lastName, email })
      .where(eq(users.id, userId));
    return { message: "Successfully updated user." };
  } catch (error) {
    return { error: `Error: ${error}` };
  }
}

export async function addProfilePictureUrl(userId: string, imageUrl: string) {
  if (!userId) return;

  try {
    await db
      .update(users)
      .set({ profilePictureUrl: imageUrl })
      .where(eq(users.id, userId));
    return { message: `Success` };
  } catch (error) {
    return { error: `Error: ${error}` };
  }
}
