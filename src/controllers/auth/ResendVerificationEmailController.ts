import { Request, Response, NextFunction } from 'express'
import configs from '../../config/config'
import { sendRequestCouldNotBeCompletedError, sendUserAccountNotAvailableError } from '../../helpers/errors/commonAppAuthErrors'
import asyncHandler from '../../utils/asyncHandler'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import generateVerificationString from '../../utils/auth/generateVerificationString'
import { sendAccountRegistrationSuccessfulEmail } from '../../utils/emails/auth/successEmails'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'

export default asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => { 

        const email = req.params.email

        const user = await findUserByEmail(email)

        if (!user) return next(sendUserAccountNotAvailableError())
        
        const { verificationString, verificationStringExpiry, hashedString } =
            await generateVerificationString()
        
        user.verificationString = hashedString;
        user.verificationStringExpiry = verificationStringExpiry;

        if (await (!user.save())) return next(sendRequestCouldNotBeCompletedError())
        
          // send user registration succesful mail
    await sendAccountRegistrationSuccessfulEmail({
      email: email,
      name: user.first_name,
      link: `${configs.CLIENT_URL}?verificationCode=${verificationString}&email=${email}`,
    })

        return sendSuccessApiResponse({
            res,
            message: 'Verification link succesfully resent',
            data:{}
        })

    }
)