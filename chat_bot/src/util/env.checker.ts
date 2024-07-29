import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  phone_number: z.string()
})

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.data) {
  throw new Error("Invalid environment variables");
  process.exit(1);
}

const { PORT, phone_number } = parsedEnv.data;

export { phone_number, PORT };

