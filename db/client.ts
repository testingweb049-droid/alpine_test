// /src/db/client.ts
import { drizzle } from "drizzle-orm/neon-http";
import { bookings } from "./schema/bookings";

export const db = drizzle(
  process.env.DATABASE_URL!,
  { schema: { bookings } }
);
