import logger from "../utils/logger";

export default  (response : any) => {
  logger.info(
    `Method: ${response.config.method}, URL: ${response.config.url}`
  );
  logger.info(
    `API Response - status: ${response.status}; statusText: ${response.statusText}; message: ${response.data.message}`
  );
  if (`${response.status}`.startsWith("2") && response.data.status !== false)
    return true;
  return false;
};
