import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import v1Routes from './routes/v1'
import { sendNotFoundError } from './helpers/errors/commonAppErrors'
import { AppError, handleAppError } from './utils/error/AppError'
import sendSuccessApiResponse from './utils/response/sendSuccessApiResponse'
import { connectDatabase } from './config/database'
import ejs from 'ejs'
import cookieParser from 'cookie-parser'

// connect DB
connectDatabase()

const app = express()

// Express body parsers
app.use(json({ limit: '50kb' }))
app.use(urlencoded({ extended: false, limit: '50kb' }))

// Setup cookie
app.use(cookieParser())

// view engine setup
app.set('view engine', 'ejs')

// CORS middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use('/v1', v1Routes)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  return sendSuccessApiResponse({
    res,
    statusCode: 200,
    message: 'Welcome to Interior-AI Backend API 😁.',
    data: {},
  })
})

app.all('*', (req, res, next) => {
  next(sendNotFoundError('Invalid route! 🙄'))
})

// Global error Handling middleware

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  return handleAppError(res, err)
})

export default app
