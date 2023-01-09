import configs from '../../config/config'
import generateString from './generateString'
import { hashString } from './hash'

export default async () => {
  const string = generateString(10)

  //encrypt string and save to DB
  const verificationString = await hashString(string)

  // save otp expiry date to DB
  const verificationStringExpiry =
    Date.now() + 1000 * 60 * parseInt(configs.VERIFCATION_TIME_EXPIRY_MINUTES)

  return {
    hashedString: verificationString,
    verificationString: string,
    verificationStringExpiry: verificationStringExpiry,
  }
}
