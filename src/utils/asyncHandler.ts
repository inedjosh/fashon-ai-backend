/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>

export default (functionToExecute: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    functionToExecute(req, res, next).catch(next)
  }
