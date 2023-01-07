import { createClient } from "redis";
import logger from "../utils/logger";
import configs from "./config";

export const redisURL = `redis://${configs.REDIS_HOST}:${configs.REDIS_PORT}`;


export const redisClient = () => {
  const client = createClient({
    url: redisURL,
    legacyMode: true,
  });

  client.connect();

  client.on("error", (err) => logger.error(`${err.name}: ${err.message}`));

  return client;
};
