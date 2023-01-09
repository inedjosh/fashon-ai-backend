import asyncHandler from '../../utils/asyncHandler'
import { NextFunction, Request, Response } from 'express'
import { sendBadRequestError } from '../../helpers/errors/commonAppErrors'
import logger from '../../utils/logger'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import { sendUserAccountNotAvailableError } from '../../helpers/errors/commonAppAuthErrors'
import { validationResult } from 'express-validator'
import getErrorMessagesFromArray from '../../helpers/getErrorMessagesFromArray'
import { compareString } from './../../utils/auth/hash'
import checkIfVerificationStringIsExpired from '../../utils/auth/checkIfVerificationStringIsExpired'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMessages = getErrorMessagesFromArray(errors.array())
      next(sendBadRequestError(errorMessages))
    }

    const { verificationCode, email } = req.body

    if (!verificationCode || !email)
      next(sendBadRequestError('Invalid verification string'))

    const user = await findUserByEmail(email)

    if (!user) next(sendUserAccountNotAvailableError())

    if (!user.verificationString)
      next(
        sendBadRequestError(
          'Verification expired or is invalid! Please try again'
        )
      )

    // verify verificationString
    const checkIfStringIsValid = await checkIfVerificationStringIsExpired(
      verificationCode,
      user.verificationString,
      user.verificationStringExpiry
    )

    if (!checkIfStringIsValid)
      next(
        sendBadRequestError(
          'Verification expired or is invalid! Please try again'
        )
      )

    user.verificationString = null
    user.verificationStringExpiry = null
    user.trials = 3
    user.account_verified = true

    if (!(await user.save()))
      next(sendBadRequestError('Something went wrong, Please try again'))

    return sendSuccessApiResponse({
      res,
      statusCode: 200,
      message: 'Successfully verified account',
      data: {},
    })
  }
)
