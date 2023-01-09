import Queue from 'bull'
import { redisURL } from './redis'

export const initializeQueue = (queue_name: string) => {
  const queue = new Queue(queue_name, redisURL)
  return queue
}
