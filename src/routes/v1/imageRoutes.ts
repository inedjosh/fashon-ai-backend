import { Router } from 'express'
import imageToImage from '../../controllers/images/imageToImage'
import textToImage from '../../controllers/images/textToImage'
import isAuth from '../../middleware/is-auth'

const router = Router()

/** /v1/image/text */
router.post('/text', textToImage)

/** /v1/image/text */
router.post('/image', isAuth, imageToImage)

export default router
