import { Router } from 'express'
import imageToImage from '../../controllers/images/imageToImage'
import textToImage from '../../controllers/images/textToImage'
import isAuth from '../../middleware/is-auth'

const router = Router()

/** /v1/profile/:id */
router.post('/:userId', isAuth)

/** /v1/profile/:id */
router.put('/:userId', isAuth)

export default router
