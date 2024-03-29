import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { Lucia } from "lucia";
import db from "./db";
import { sessions, users } from "./db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
