import { Request, Response, NextFunction } from 'express'
import asyncHandler from '../../utils/asyncHandler'
import { sendBadRequestError } from '../../helpers/errors/commonAppErrors'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import { sendUserAccountNotAvailableError } from '../../helpers/errors/commonAppAuthErrors'
import { verifyTransaction } from '../../services/paystack'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'
import logger from '../../utils/logger'
import { createOneFactory } from '../../utils/factories/factories'
import SubscriptionModel from '../../models/Subscription'
import { sterilizeCharge } from '../../helpers/sterilizers'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.params.email
    const reference = req.params.reference

    logger.info(req.body.user.email)
    logger.info(reference)
    logger.info(email)

    if (email !== req.body.user.email)
      return next(
        sendBadRequestError('Authentication failed, login and try again')
      )

    if (!email || !reference)
      return next(sendBadRequestError('Invalid request.'))

    const user = await findUserByEmail(email)

    if (!user) return next(sendUserAccountNotAvailableError())

    const response = await verifyTransaction(reference)

    const chargeObj = sterilizeCharge(response)

    const suscriptionData = await createOneFactory({
      model: SubscriptionModel,
      fields: {
        userId: user._id,
        trx_reference: chargeObj.reference,
        amount: chargeObj.amount,
        trials: chargeObj.amount === 1000 ? 100 : 30,
      },
    })

    return sendSuccessApiResponse({
      res,
      statusCode: 200,
      message: 'payment verification was succesfull',
      data: { data: suscriptionData },
    })
  }
)
