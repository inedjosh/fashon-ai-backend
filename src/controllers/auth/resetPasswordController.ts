import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import {
  sendInvalidOtpError,
  sendRequestCouldNotBeCompletedError,
  sendUserAccountNotAvailableError,
} from '../../helpers/errors/commonAppAuthErrors'
import { sendBadRequestError } from '../../helpers/errors/commonAppErrors'
import getErrorMessagesFromArray from '../../helpers/getErrorMessagesFromArray'
import asyncHandler from '../../utils/asyncHandler'
import checkIfOtpIsValidAndHasNotExpired from '../../utils/auth/checkIfOtpIsValidAndHasNotExpired'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import { sendPasswordResetSuccessfulEmail } from '../../utils/emails/auth/successEmails'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMessages = getErrorMessagesFromArray(errors.array())
      next(sendBadRequestError(errorMessages))
    }

    const { email, password, otp } = req.body

    const user = await findUserByEmail(email)

    if (!user) next(sendUserAccountNotAvailableError())

    if (!user.otp) next(sendInvalidOtpError())

    const otpIsValid = await checkIfOtpIsValidAndHasNotExpired({
      otp: otp,
      dbOtp: user.otp,
      otpExpiryTime: user.otp_time_expiry,
    })

    if (!otpIsValid) next(sendInvalidOtpError())

    user.password = password
    user.otp = undefined
    user.otp_time_expiry = undefined

    if (!(await user.save())) {
      next(sendRequestCouldNotBeCompletedError())
    }

    // send password successfully reset email
    await sendPasswordResetSuccessfulEmail({
      email: user.email,
      name: user.first_name,
    })

    return sendSuccessApiResponse({
      res,
      statusCode: 200,
      message:
        'Password reset successful! 😀 Proceed to login with your new password',
      data: {},
    })
  }
)
