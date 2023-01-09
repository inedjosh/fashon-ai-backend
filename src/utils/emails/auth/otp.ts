import { appNotInTestEnvironment } from '../../../helpers/environments'
import sendEmailJob from '../../../services/qeues/jobs/sendEmailJob'
import { OtpEmails } from '../types'

export const sendForgotPasswordOtp = async ({
  email,
  otp,
  name,
}: OtpEmails) => {
  if (appNotInTestEnvironment()) {
    await sendEmailJob({
      reciepient: email,
      subject: 'Forgot password OTP',
      mailData: {
        otp: otp,
        username: name,
      },
      mailTemplate: 'auth/forgotPassword',
    })
  }
  return true
}

export const sendResendForgotPasswordOtp = async ({
  email,
  name,
  otp,
}: OtpEmails) => {
  if (appNotInTestEnvironment()) {
    await sendEmailJob({
      reciepient: email,
      subject: 'Resent Forgot password OTP',
      mailData: {
        otp: otp,
        username: name,
      },
      mailTemplate: 'auth/resendOtp',
    })
  }
  return true
}
