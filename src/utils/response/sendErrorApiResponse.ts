import { ErrorApiResponse } from './types'

export default ({ res, statusCode, status, message }: ErrorApiResponse) => {
  return res.status(statusCode).send({
    status: status,
    message: message,
  })
}
