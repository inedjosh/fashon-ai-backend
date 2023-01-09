import dotenv from 'dotenv'

dotenv.config()

export const configs = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 4000,
  ENVIRONMENT: process.env.ENVIRONMENT,

  SENTRY_DNS: process.env.SENTRY_DNS || '',

  DB_PRODUCTION_URL: process.env.DB_PRODUCTION_URL || '',
  DB_DEV_URL: process.env.DB_DEV_URL || '',
  DB_TEST_URL: process.env.DB_TEST_URL || '',

  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '',

  OTP_TIME_EXPIRY_MINUTES: process.env.OTP_TIME_EXPIRY_MINUTES || '',

  REDIS_HOST: process.env.REDIS_HOST || '',
  REDIS_PORT: process.env.REDIS_PORT || '',

  MAIL_HOST: process.env.MAIL_HOST || '',
  MAIL_PORT: process.env.MAIL_PORT || '',
  MAIL_USERNAME: process.env.MAIL_USERNAME || '',
  MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
  MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS || '',

  VERIFCATION_TIME_EXPIRY_MINUTES:
    process.env.VERIFCATION_TIME_EXPIRY_MINUTES || '',

  CLIENT_URL: process.env.CLIENT_URL || '',

  STABLE_DIFFUSION_KEY: process.env.STABLE_DIFFUSION_KEY || '',

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
}

export default configs
