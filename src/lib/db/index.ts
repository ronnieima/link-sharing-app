import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(
  "postgresql://ronnieima:l8iZ7PLjEFtR@ep-still-heart-a59g49k2.us-east-2.aws.neon.tech/devlinks?sslmode=require",
);
const db = drizzle(sql, { schema });

export default db;
