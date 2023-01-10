import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import configs from '../../config/config'
import { postRequest } from '../../helpers/apiRequests'
import {
  sendBadRequestError,
  sendUnProcessableEntityError,
} from '../../helpers/errors/commonAppErrors'
import getErrorMessagesFromArray from '../../helpers/getErrorMessagesFromArray'
import { uploadImage } from '../../services/cloudinary'
import asyncHandler from '../../utils/asyncHandler'
import logger from '../../utils/logger'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import { sendUserAccountNotAvailableError } from '../../helpers/errors/commonAppAuthErrors'
import checkTrials from '../../utils/image/checkTrials'
import { createOneFactory } from '../../utils/factories/factories'
import ImageModel from '../../models/Image'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.params.page)

    const images = await ImageModel.find().sort({ createdAt: -1 }).limit(5)

    const totalCount = await ImageModel.countDocuments()

    return sendSuccessApiResponse({
      res,
      statusCode: 200,
      message: 'Successfully fetched image',
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
