import { defineConfig } from "drizzle-kit";
import {readConfig} from "../Gator/src/config";

export default defineConfig({
  schema: "src/lib/db/schema.ts",
  out: "src/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: readConfig().dbUrl,
  },
});