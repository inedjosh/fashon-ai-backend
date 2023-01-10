import { Router } from 'express'
import getAllImageController from '../../controllers/images/getAllImageController'
import getUserImageController from '../../controllers/images/getUserImageController'
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

/** /v1/image/ */
router.get('/:page', getAllImageController)

/** /v1/image/email&page */
router.get('/:email&:page', isAuth, getUserImageController)

export default router
