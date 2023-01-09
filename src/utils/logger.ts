import winston from 'winston'
import configs from '../config/config'
import Sentry from 'winston-sentry-log'

const commonAppLogTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
})

const errorLogTransport = new winston.transports.File({
  level: 'error',
  filename: 'logs/errors.log',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
    winston.format.json()
  ),
})

const infoAppLogTransport = new winston.transports.File({
  level: 'info',
  filename: 'logs/app.log',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
    winston.format.json()
  ),
})

// const sentryHttpTransport = new Sentry({
//   config: {
//     dsn: configs.SENTRY_DNS,
//   },
// });

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [commonAppLogTransport],
})

// Production logs

if (configs.NODE_ENV === 'production') {
  logger.add(infoAppLogTransport)
  logger.add(errorLogTransport)
  //   logger.add(sentryHttpTransport);
}

export default logger
