import { Router } from 'express'
import imageToImage from '../../controllers/images/imageToImage'
import textToImage from '../../controllers/images/textToImage'
import subscriptionValidators from '../../helpers/validators/subscriptionValidators'
import isAuth from '../../middleware/is-auth'

const router = Router()

/** /v1/suscribe/ */
router.post('/', subscriptionValidators, isAuth)

/** /v1/image/text */
router.get('/:userId', isAuth, isAuth)

export default router
