import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  email: text("email").unique().notNull(),
  emailVerified: boolean("emailVerified").default(false),
  hashedPassword: text("hashedPassword").notNull(),
  profilePictureUrl: text("profilePictureUrl"),
});

export const sessions = pgTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const links = pgTable("link", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  platform: text("platform").default("github").notNull(),
  url: text("url").default("").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  userId: text("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export type LinkType = InferSelectModel<typeof links>;

export const emailVerificationCodes = pgTable("emailVerificationCode", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  code: text("text").notNull(),
  userEmail: text("userEmail").notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  userId: text("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});
