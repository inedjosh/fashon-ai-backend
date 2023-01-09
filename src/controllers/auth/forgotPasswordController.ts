import { NextFunction, Request, Response } from 'express'
import configs from '../../config/config'
import {
  sendProvideEmailError,
  sendRequestCouldNotBeCompletedError,
  sendUserAccountNotAvailableError,
} from '../../helpers/errors/commonAppAuthErrors'
import asyncHandler from '../../utils/asyncHandler'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import generateString from '../../utils/auth/generateString'
import { hashString } from '../../utils/auth/hash'
import { sendForgotPasswordOtp } from '../../utils/emails/auth/otp'
import logger from '../../utils/logger'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    if (!email) next(sendProvideEmailError())

    const user = await findUserByEmail(email)

    if (!user) next(sendUserAccountNotAvailableError())

    // generate otp
    const otp = generateString(5)


  //encrypt otp and save to DB
  user.otp = await hashString(otp)

  // save otp expiry date to DB
  user.otp_time_expiry =
    Date.now() + 1000 * 60 * parseInt(configs.OTP_TIME_EXPIRY_MINUTES)

    if (!(await user.save())) next(sendRequestCouldNotBeCompletedError())

        logger.info(otp)
        
    // send otp to users mail
     sendForgotPasswordOtp({
      email: email,
      name: user.first_name,
      otp: otp,
    })

    // send success response
    return sendSuccessApiResponse({
      res,
      statusCode: 200,
      message: 'Successfully sent otp to users email',
      data: {},
    })
  }
)
