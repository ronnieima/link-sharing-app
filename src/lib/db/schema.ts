import { randomUUID } from "crypto";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$default(() => randomUUID()),
  email: text("email"),
  hashedPassword: text("hashedPassword").notNull(),
});

export const sessions = pgTable("session", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID())
    .notNull(),
  userId: text("userId")
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const links = pgTable("link", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID())
    .notNull(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  userId: text("userId")
    .references(() => users.id)
    .notNull(),
});
