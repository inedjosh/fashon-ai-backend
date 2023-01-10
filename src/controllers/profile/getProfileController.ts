import { Request, Response, NextFunction } from 'express'
import UserModel from '../../models/User'
import asyncHandler from '../../utils/asyncHandler'
import { findOneFactory } from '../../utils/factories/factories'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params

    const user = await findOneFactory(UserModel, { _id: userId })

    sendSuccessApiResponse({
      res,
      statusCode: 200,
      message: 'Successfully fetched user',
      data: {
        user: user,
      },
    })
  }
)
