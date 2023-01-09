/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from '../../utils/error/AppError'
import { Response } from 'http-status-codez'

export const sendBadRequestError = (errorMessage: any) => {
  throw new AppError(Response.HTTP_BAD_REQUEST, errorMessage)
}

export const sendUnProcessableEntityError = (errorMessage: any) => {
  throw new AppError(Response.HTTP_UNPROCESSABLE_ENTITY, errorMessage)
}

export const sendUnAuthorizedError = (errorMessage: any) => {
  throw new AppError(Response.HTTP_UNAUTHORIZED, errorMessage)
}

export const sendNotFoundError = (errorMessage: any) => {
  throw new AppError(Response.HTTP_NOT_FOUND, errorMessage)
}

export const sendInternalServerError = (errorMessage: any) => {
  throw new AppError(Response.HTTP_INTERNAL_SERVER_ERROR, errorMessage)
}

export const sendFailError = (errorMessage: any) => {
  throw new AppError(Response.HTTP_FAILED_DEPENDENCY, errorMessage)
}

export const serverBusyError = () => {
  throw new AppError(
    503,
    'Server busy at the moment, please try in a short while.'
  )
}
