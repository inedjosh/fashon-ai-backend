import http from 'http'
import app from './app'
import logger from './utils/logger'
import getServerPort from './utils/getServerPort'
import { appInProductionEnvironment } from './helpers/environments'
import os from 'os'
import configs from './config/config'

const server = http.createServer(app)

if (appInProductionEnvironment() === false) {
  const port = getServerPort()

  server.listen(port, () => {
    logger.info(
      `Server up and running, listening on http://localhost:${port} Process: ${
        process.pid
      } ENV: ${configs.ENVIRONMENT} Host: ${os.hostname()}`
    )
  })
}

// if (appInDevelopmentEnvironment()) {
//   startCrons();
// }

process.on('unhandledRejection', (err: Error) => {
  logger.error('An unhandled Rejection occured...')
  logger.error(`${err.name}: ${err.message}`)
  process.exit(1)
})

process.on('uncaughtException', (err: Error) => {
  logger.error('An Uncaught Exception occured...')
  logger.error(`${err.name}: ${err.message}`)
  process.exit(1)
})

export default server
