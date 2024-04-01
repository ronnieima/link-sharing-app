"use server";
import db from "@/lib/db";
import { links, LinkType } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getLinks(userId: string) {
  try {
    const userLinks = await db.execute(sql`
      SELECT *
      FROM ${links}
      WHERE ${links.userId} = ${userId}
      ORDER BY ${links.createdAt}
    `);

    return { data: userLinks.rows as LinkType[] };
  } catch (error) {
    return { error: "Unknown error ooccured" };
  }
}

export async function updateLinks(
  values: { links: { platform: string; url: string }[] },
  userId: string,
) {
  const newLinksWithUserId = values.links.map((newLink) => ({
    ...newLink,
    userId,
  }));
  try {
    if (values.links.length !== 0) {
      await db.delete(links).where(eq(links.userId, userId));
      await db.insert(links).values(newLinksWithUserId);
    } else {
      await db.delete(links).where(eq(links.userId, userId));
    }
    revalidatePath("/customize");
    return { message: "Success" };
  } catch (error) {
    return { error: "Failed to update links" };
  }
}
