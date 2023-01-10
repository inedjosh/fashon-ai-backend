import { profile } from 'console'
import {
  Router,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'
import authRoutes from './authRoutes'
import imageRoutes from './imageRoutes'
import profileRoutes from './profileRoutes'
import subsriptionRoutes from './subsriptionRoutes'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/** /v1 */
// router.use('/', (req: Request, res: Response, next: NextFunction) => {
//   return sendSuccessApiResponse({
//     res,
//     statusCode: 200,
//     message: 'Welcome to Interior-AI Backend API 😁.',
//     data: {},
//   })
// })

/** /v1/auth/ */
router.use('/auth', authRoutes)

/** /v1/image/ */
router.use('/image', imageRoutes)

/** /v1/subscribe/ */
router.use('/subscribe', subsriptionRoutes)

/** /v1/profile/ */
router.use('/profile', profileRoutes)

export default router
