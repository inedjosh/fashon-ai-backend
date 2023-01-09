import { Response } from 'express'
import { sterilizeUserObj } from '../../helpers/sterilizers'
import sendSuccessApiResponse from '../response/sendSuccessApiResponse'
import { signPayload } from './jwt'

export default async (res: Response, user: any, action: string) => {
  // cache user
  const token = signPayload({ id: user._id, email: user.email })

  return sendSuccessApiResponse({
    res,
    statusCode: 200,
    message: `Successfully ${action} in`,
    data: {
      user: sterilizeUserObj(user),
      token,
    },
  })
}
