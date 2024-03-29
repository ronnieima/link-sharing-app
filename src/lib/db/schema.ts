import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  email: text("email"),
  emailVerified: boolean("emailVerified").default(false),
  hashedPassword: text("hashedPassword").notNull(),
});

export const sessions = pgTable("session", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const links = pgTable("link", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
});

export const emailVerificationCodes = pgTable("emailVerificationCode", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  code: text("text").notNull(),
  userEmail: text("userEmail").notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
});
