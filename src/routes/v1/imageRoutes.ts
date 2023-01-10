import { Router } from 'express'
import imageToImage from '../../controllers/images/imageToImage'
import textToImage from '../../controllers/images/textToImage'
import imageToImageValidator from '../../helpers/validators/imageToImageValidator'
import textToImageValidator from '../../helpers/validators/textToImageValidator'
import isAuth from '../../middleware/is-auth'

const router = Router()

/** /v1/image/text */
router.post('/text', textToImageValidator, isAuth, textToImage)

/** /v1/image/image */
router.post('/image', imageToImageValidator, isAuth, imageToImage)

export default router
