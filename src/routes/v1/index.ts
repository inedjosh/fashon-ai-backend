import { Router,  json,
  NextFunction,
  Request,
  Response,
  urlencoded, } from 'express'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse';

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return sendSuccessApiResponse({
    res,
    statusCode: 200,
    message: "Welcome to Beam Backend API 😁.",
    data: {},
  });
});


export default router;