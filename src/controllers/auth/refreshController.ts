import asyncHandler from '../../utils/asyncHandler'
import { Request, Response, NextFunction } from 'express'
import logger from '../../utils/logger'
import sendErrorApiResponse from '../../utils/response/sendErrorApiResponse'
import {
  sendBadRequestError,
  sendUnAuthorizedError,
} from '../../helpers/errors/commonAppErrors'
import { signPayload, verifyJwt } from '../../utils/auth/jwt'
import configs from '../../config/config'
import { JwtPayload } from 'jsonwebtoken'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'
import { sterilizeUserObj } from '../../helpers/sterilizers'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refresh_token = req.cookies.refresh_token

    if (!refresh_token)
      return next(
        sendBadRequestError('Authentication failed, log in and try again!')
      )

    const decoded: any = await verifyJwt(
      refresh_token,
      configs.JWT_REFRESH_SECRET
    )
console.log('line-2',decoded);
    if (!decoded)
      return next(
        sendUnAuthorizedError(
          'Request could not be authorized, please login again.'
        )
      )

    const user = await findUserByEmail(decoded.email)

    if (!user)
      return next(
        sendUnAuthorizedError('Authentication failed, login and try again!')
      )

    const access_token = signPayload(
      { id: user._id, email: user.email },
      configs.JWT_ACCESS_SECRET
    )

    return sendSuccessApiResponse({
      res,
      message: 'access granted, token refreshed',
        data: {
            access_token,
            user:  sterilizeUserObj(user),
        },
      status: 'success',
    })
  }
)
