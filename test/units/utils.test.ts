import checkIfOtpIsValidAndHasNotExpired from '../../src/utils/auth/checkIfOtpIsValidAndHasNotExpired'
import generateString from '../../src/utils/auth/generateString'
import { compareString, hashString } from '../../src/utils/auth/hash'
import { assert } from 'chai'
import generateVerificationString from '../../src/utils/auth/generateVerificationString'
import { signPayload } from '../../src/utils/auth/jwt'
import { configs } from './../../src/config/config'

describe('Application utilities tests', () => {
  it('Should return a string ', () => {
    const len = 10

    const str = generateString(len)

    assert.isString(str)
  })

  it('Should return a length equal the length supplied', () => {
    const len = 10

    const str = generateString(len)

    assert.equal(str.length, len)
  })

  it('Should generate verification object for user verification', async () => {
    const verificationStringObj = await generateVerificationString()

    assert.isObject(verificationStringObj)
  })

  it('Should return a hashed string', async () => {
    const str = generateString(8)
    const hashedString = await hashString(str)

    assert.isString(str)
    assert.isString(hashedString)
    assert.isString(hashedString)
  })

  it('Should return a boolean value on string comparison', async () => {
    const str = generateString(8)
    const hashedString = await hashString(str)

    const result = await compareString({ string: str, hash: hashedString })

    assert.isBoolean(result)
    assert.isString(str)
    assert.isString(hashedString)
  })

  it('Should sign payload and return a string', async () => {
    const user = {
      user_email: 'user@example.com',
      user_id: 'abcienenen',
    }

    const token = signPayload(user, configs.JWT_ACCESS_SECRET)

    assert.isString(token)
  })
})
