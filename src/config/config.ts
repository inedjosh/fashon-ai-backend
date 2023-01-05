import dotenv from "dotenv";

dotenv.config();

export const configs = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 4000,
  ENVIRONMENT: process.env.ENVIRONMENT,

    SENTRY_DNS: process.env.SENTRY_DNS || "",
  
    DB_PRODUCTION_URL: process.env.DB_PRODUCTION_URL || "",
    DB_DEV_URL: process.env.DB_DEV_URL || "",
    DB_TEST_URL: process.env.DB_TEST_URL || "",

};

export default configs;
