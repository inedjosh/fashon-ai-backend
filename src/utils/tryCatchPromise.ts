import logger from './logger'

export default (job: any) => async (data: any) => {
  try {
    await job(data)
    return Promise.resolve(true)
  } catch (error: any) {
    logger.error(error)
    return Promise.reject(new Error(error))
  }
}
