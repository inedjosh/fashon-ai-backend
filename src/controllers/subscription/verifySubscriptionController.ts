import { Request, Response, NextFunction } from 'express'
import asyncHandler from '../../utils/asyncHandler'
import { sendBadRequestError } from '../../helpers/errors/commonAppErrors'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import { sendUserAccountNotAvailableError } from '../../helpers/errors/commonAppAuthErrors'
import { verifyTransaction } from '../../services/paystack'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, reference } = req.params

    if (email !== req.body.user.email)
      return next(
        sendBadRequestError('Authentication failed, login and try again')
      )

    if (!email || !reference)
      return next(sendBadRequestError('Invalid request.'))

    const user = await findUserByEmail(email)

    if (!user) return next(sendUserAccountNotAvailableError())

    const response = await verifyTransaction(reference)

    return sendSuccessApiResponse({
      res,
      statusCode: 200,
      message: 'verification succesfull',
      data: { data: response },
    })
  }
)
