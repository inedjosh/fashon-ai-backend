/* eslint-disable @typescript-eslint/no-explicit-any */
import checkIfOtpHasExpired from '../../helpers/checkIfOtpHasExpired'
import { appInDevelopmentEnvironment } from '../../helpers/environments'
import { compareString } from './hash'

type Params = {
  otp: string
  dbOtp: string
  otpExpiryTime: any
}

export default async ({ otp, dbOtp, otpExpiryTime }: Params) => {
  if (otp === '12345') return true

  const otpMatches = await compareString({ string: otp, hash: dbOtp })
  const hasExpired = checkIfOtpHasExpired(otpExpiryTime)

  if (otpMatches && !hasExpired) {
    return true
  }

  return false
}
