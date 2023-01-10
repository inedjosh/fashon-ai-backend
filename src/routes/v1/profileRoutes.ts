import { Router } from 'express'
import imageToImage from '../../controllers/images/imageToImage'
import textToImage from '../../controllers/images/textToImage'
import editProfileController from '../../controllers/profile/editProfileController'
import getProfileController from '../../controllers/profile/getProfileController'
import isAuth from '../../middleware/is-auth'

const router = Router()

/** /v1/profile/:id */
router.post('/:userId', isAuth, getProfileController)

/** /v1/profile/:id */
router.put('/:userId', isAuth, editProfileController)

export default router
