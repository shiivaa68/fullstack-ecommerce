import dotenvSafe from "dotenv-safe";
import path from "path";

// ✅ Always resolve to project root, not dist/
dotenvSafe.config({
  allowEmptyValues: false,
  path: path.resolve(__dirname, "../../.env"),          // real env
  example: path.resolve(__dirname, "../../.env.example"), // template env
});

export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || "development",

  // DB
  dbUrl:
    process.env.DB_URL ||
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },
};
