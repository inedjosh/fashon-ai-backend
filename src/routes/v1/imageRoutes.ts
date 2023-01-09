import { Router } from 'express'
import imageToImage from '../../controllers/images/imageToImage';
import textToImage from '../../controllers/images/textToImage';


const router =  Router()

/** /v1/image/text */
router.post('/text', textToImage)

/** /v1/image/text */
router.post('/image', imageToImage)




export default router;