import mongoose from "mongoose";
import configs from "../config/config";
import logger from "../utils/logger";

function getDatabaseURL(environment: any) {
  switch (environment) {
    case "production":
      return configs.DB_PRODUCTION_URL;
    case "development":
      return configs.DB_DEV_URL;
    case "test":
      return configs.DB_TEST_URL;
    default:
      return configs.DB_DEV_URL;
  }
}

export const connectDatabase = () => {
  const databaseUrl = getDatabaseURL(configs.NODE_ENV);

  mongoose
    .connect(databaseUrl)
    .then(() => {
      logger.info("Connected to DB 😊");
    })
    .catch((error) => {
      logger.error(`${error.name}: ${error.message}`);
    });
};
