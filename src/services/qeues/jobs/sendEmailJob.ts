/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeQueue } from "../../../config/queues";
import logger from "../../../utils/logger";
import tryCatchPromise from "../../../utils/tryCatchPromise";
import { sendEmail } from "../../emailService";
import { SendEmail } from "../../types";

const queue = initializeQueue("Emails-jobs");

const sendEmailJob = async (data: SendEmail) => {
  // Producer
  await queue.add(data, {
    removeOnComplete: true,
    attempts: 2,
    backoff: {
      type: "fixed",
      delay: 3000,
    },
    timeout: 5000,
  });

  return true;
};

// Consumer
queue.process(async (job: any) => {
  tryCatchPromise(await sendEmail(job.data));
});

queue.on("failed", (job, error) => {
  logger.error(
    `Job <${job.queue.name}> failed after specified retries with error ${error}`,
  );
});

export default sendEmailJob;
