"use server";
import db from "@/lib/db";
import { links, LinkType } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { toast } from "react-toastify";

export async function addLink(userId: string) {
  const MAX_LINKS_AMOUNT = 5;

  try {
    const userLinks = await db.execute(sql`
    SELECT COUNT(*)
    FROM ${links}
    WHERE ${links.userId} = ${userId}
  `);

    const currentRowCount = parseInt(userLinks.rows[0].count as string);
    if (currentRowCount >= MAX_LINKS_AMOUNT) {
      return {
        error: `Maximum amount of links (${MAX_LINKS_AMOUNT}) reached.`,
        code: `max_links`,
      };
    }

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

    return { data: userLinks.rows as LinkType[] };
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
