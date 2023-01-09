import { Response } from 'express'

export type ApiResponse = {
  res: Response
  status?: string
  message?: string
}

export type ErrorApiResponse = ApiResponse & {
  statusCode: number
  data?: object
}

export type SucessApiResponse = ApiResponse & {
  statusCode?: number
  data: object
}
