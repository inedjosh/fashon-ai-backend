import { SucessApiResponse } from './types'

export default ({
  res,
  message,
  statusCode = 200,
  data,
}: SucessApiResponse) => {
  return res.status(statusCode).json({
    status: 'success',
    message: message,
    data: data,
  })
}
