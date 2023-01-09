/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer'
import path from 'path'
import ejs from 'ejs'
import configs from '../config/config'
import logger from '../utils/logger'
import { SendEmail } from './types'
// import { appInProductionEnvironment } from "../helpers/environments";

export const sendEmail = async ({
  reciepient,
  mailData,
  subject,
  mailTemplate,
}: SendEmail) => {
  const transportConfig = {
    host: configs.MAIL_HOST,
    port: parseInt(configs.MAIL_PORT),
    secure: false,
    auth: {
      user: configs.MAIL_USERNAME,
      pass: configs.MAIL_PASSWORD,
    },
  }

  // if (appInProductionEnvironment()) {
  //   transportConfig.secure = true;
  // }

  const transporter = nodemailer.createTransport(transportConfig)

  const mailHtml = await ejs.renderFile(
    path.resolve(`src/views/emails/${mailTemplate}.ejs`),
    { data: { ...mailData } }
  )

  const message = {
    from: `Interior AI <${configs.MAIL_FROM_ADDRESS}>`,
    subject: subject,
    to: reciepient,
    html: mailHtml,
  }

  transporter
    .sendMail(message)
    .then((res: any) => logger.info(JSON.stringify(res)))
    .catch((err: any) => {
      logger.error(`${err.name}: ${err.message}`)
      // throw new Error(err);
    })

  transporter.close()
  return true
}
