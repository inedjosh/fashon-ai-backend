import { Request, Response, NextFunction } from 'express'
import asyncHandler from '../../utils/asyncHandler'
import { sendBadRequestError } from '../../helpers/errors/commonAppErrors'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import { sendUserAccountNotAvailableError } from '../../helpers/errors/commonAppAuthErrors'
import { initializeCharge } from '../../services/paystack'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'
import { validationResult } from 'express-validator'
import getErrorMessagesFromArray from '../../helpers/getErrorMessagesFromArray'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMessages = getErrorMessagesFromArray(errors.array())
      next(sendBadRequestError(errorMessages))
    }

    const { email, amount } = req.body

    if (email !== req.body.user.email)
      return next(
        sendBadRequestError('Authentication failed, login and try again')
      )

    if (!email || !amount) return next(sendBadRequestError('Invalid request.'))

    const user = await findUserByEmail(email)

    if (!user) return next(sendUserAccountNotAvailableError())

    // initialize charge
    const response = await initializeCharge({ email, amount })

    return sendSuccessApiResponse({
      res,
      statusCode: 201,
      message: 'Succesfully generated charge',
      data: { data: response },
    })
  }
)
