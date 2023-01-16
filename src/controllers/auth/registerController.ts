import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../../utils/asyncHandler'
import { validationResult } from 'express-validator'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import { sendBadRequestError } from '../../helpers/errors/commonAppErrors'
import { hashString } from '../../utils/auth/hash'
import { createOneFactory } from '../../utils/factories/factories'
import UserModel from '../../models/User'
import { sendRequestCouldNotBeCompletedError } from '../../helpers/errors/commonAppAuthErrors'
import createAuthTokenAndSendToUser from '../../utils/auth/createAuthTokenAndSendToUser'
import { sendAccountRegistrationSuccessfulEmail } from '../../utils/emails/auth/successEmails'
import generateVerificationString from '../../utils/auth/generateVerificationString'
import configs from '../../config/config'
import logger from '../../utils/logger'
import getErrorMessagesFromArray from '../../helpers/getErrorMessagesFromArray'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info('hit route')
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMessages = getErrorMessagesFromArray(errors.array())
      next(sendBadRequestError(errorMessages))
    }

    const { first_name, last_name, email, password } = req.body

    const findUser = await findUserByEmail(email)

    if (findUser) next(sendBadRequestError('User already registered'))

    const hashedPassword = await hashString(password)

    const { verificationString, verificationStringExpiry, hashedString } =
      await generateVerificationString()

    const user = await createOneFactory({
      model: UserModel,
      fields: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        verificationString: hashedString,
        verificationStringExpiry,
      },
    })

    if (!user) return next(sendRequestCouldNotBeCompletedError())

    // send user registration succesful mail
    sendAccountRegistrationSuccessfulEmail({
      email: req.body.email,
      name: user.first_name,
      link: `${configs.CLIENT_URL}?verificationCode=${verificationString}&email=${req.body.email}`,
    })

    // if user created successfully
    //** generate jwt token */
    //** send user a mail to confirm regoistration and verify email */

    createAuthTokenAndSendToUser(res, user, 'signed')
  }
)
