import { NextFunction, Request, Response } from 'express'
import { sendBadRequestError } from '../../helpers/errors/commonAppErrors'
import asyncHandler from '../../utils/asyncHandler'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import { sendUserAccountNotAvailableError } from '../../helpers/errors/commonAppAuthErrors'
import ImageModel from '../../models/Image'
import logger from '../../utils/logger'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.params.page)
    const { email } = req.params
    logger.info(email)
    if (email !== req.body.user.email)
      return next(
        sendBadRequestError('Authentication failed, login and try again')
      )

    if (!email || !page)
      return next(sendBadRequestError('Invalid request, please try again'))

    const user = await findUserByEmail(email)

    if (!user) return next(sendUserAccountNotAvailableError())

    const images = await ImageModel.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(5)

    const totalCount = images.length

    return sendSuccessApiResponse({
      res,
      statusCode: 200,
      message: 'Successfully fetched users image',
      data: {
        images: images,
        pageData: {
          pageNumber: page,
          nextPage: page == Math.floor(totalCount / 5) ? page : page + 1,
          previousPage: page == 1 ? 1 : page - 1,
        },
      },
    })
  }
)
