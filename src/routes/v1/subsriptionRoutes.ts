import { Router } from 'express'
import imageToImage from '../../controllers/images/imageToImage'
import textToImage from '../../controllers/images/textToImage'
import initializeSubscriptionController from '../../controllers/subscription/initializeSubscriptionController'
import verifySubscriptionController from '../../controllers/subscription/verifySubscriptionController'
import subscriptionValidators from '../../helpers/validators/subscriptionValidators'
import isAuth from '../../middleware/is-auth'

const router = Router()

/** /v1/initialize_suscribtion/ */
router.post(
  '/',
  subscriptionValidators,
  isAuth,
  initializeSubscriptionController
)

/** /v1/image/verify_subscription */
router.get('/:reference&:email', isAuth, verifySubscriptionController)

export default router
