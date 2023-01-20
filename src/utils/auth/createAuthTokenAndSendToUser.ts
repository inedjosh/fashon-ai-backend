import { Response } from 'express'
import { http } from 'winston'
import configs from '../../config/config'
import { appInProductionEnvironment } from '../../helpers/environments'
import { sterilizeUserObj } from '../../helpers/sterilizers'
import sendSuccessApiResponse from '../response/sendSuccessApiResponse'
import { signPayload } from './jwt'

export default async (res: Response, user: any, action: string) => {
  // cache user
  const access_token = signPayload(
    { id: user._id, email: user.email },
    configs.JWT_ACCESS_SECRET
  )
  const refresh_token = signPayload(
    { id: user._id, email: user.email },
    configs.JWT_REFRESH_SECRET
  )

  const cookieOptions = {
    expires: new Date(
      // convert to milliseconds
      Date.now() + 1000 * 60 * 60 * 24 * 7 // 1week
    ),
    httpOnly: false,
    secure: false,
  }

  if (appInProductionEnvironment()) {
    cookieOptions.secure = true
    cookieOptions.httpOnly = true
  }

  res.cookie('refresh_token', refresh_token, cookieOptions)

  console.log(res.cookie)

  return sendSuccessApiResponse({
    res,
    statusCode: 200,
    message: `Successfully ${action} in`,
    data: {
      user: sterilizeUserObj(user),
      access_token,
      refresh_token,
    },
  })
}
