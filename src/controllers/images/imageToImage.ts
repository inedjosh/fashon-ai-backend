import { NextFunction, Request, Response } from 'express'
import configs from '../../config/config'
import { postRequest } from '../../helpers/apiRequests'
import { uploadImage } from '../../services/cloudinary'
import asyncHandler from '../../utils/asyncHandler'
import logger from '../../utils/logger'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const image_url = await uploadImage(req.body.image)
    logger.info(req.body.user.email)
    // const img_data = {
    //     "key": configs.STABLE_DIFFUSION_KEY,
    //     "prompt": "a cat sitting on a bench",
    //     "negative_prompt": null,
    //     "init_image": image_url,
    //     "width": "512",
    //     "height": "512",
    //     "samples": "1",
    //     "num_inference_steps": "30",
    //     "guidance_scale": 7.5,
    //     "strength": 0.7,
    //     "seed": null,
    //     "webhook": null,
    //     "track_id": null
    // }

    // const result = await postRequest({
    //     endpoint: 'https://stablediffusionapi.com/api/v3/img2img',
    //     data: { ...img_data },
    // })

    // logger.info(result.data)

    return sendSuccessApiResponse({
      res,
      statusCode: 200,
      message: 'Successfully verified account',
      data: { img: image_url },
    })
  }
)
