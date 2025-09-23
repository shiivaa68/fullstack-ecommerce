import dotenvSafe from "dotenv-safe";
import path from "path";

dotenvSafe.config({
  allowEmptyValues: false,
  example: path.join(__dirname, "../.env.example"),
});

export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || "development",

  // DB
  dbUrl: process.env.DB_URL as string,

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },
};
