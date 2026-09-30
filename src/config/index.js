import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === "production",
  mongoDbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET
};