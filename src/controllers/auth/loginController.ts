import { Request, Response, NextFunction } from 'express'
import {
  sendInvalidLoginCredentialsError,
  sendUserAccountNotAvailableError,
} from '../../helpers/errors/commonAppAuthErrors'
import { sterilizeUserObj } from '../../helpers/sterilizers'
import createAuthTokenAndSendToUser from '../../utils/auth/createAuthTokenAndSendToUser'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import { compareString } from '../../utils/auth/hash'
import logger from '../../utils/logger'
import AsyncHandler from './../../utils/asyncHandler'

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!email && !password) return next(sendInvalidLoginCredentialsError())

    const user = await findUserByEmail(email)

    if (!user) return next(sendUserAccountNotAvailableError())

    const passwordCheck = await compareString({
      string: password,
      hash: user.password,
    })

    if (!passwordCheck) return next(sendInvalidLoginCredentialsError())

    createAuthTokenAndSendToUser(res, user, 'logged')
  }
)
