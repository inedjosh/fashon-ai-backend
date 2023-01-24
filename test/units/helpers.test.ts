import { assert } from 'chai'
import checkIfOtpHasExpired from '../../src/helpers/checkIfOtpHasExpired'

describe('Application helpers test', () => {
  it('Should return true if otpTime is previous than current time', () => {
    const time = Date.now() - 200

    const result = checkIfOtpHasExpired(time)

    assert.isFalse(result)
  })

  it('Should return false if the  otpTime is above the current time', () => {
    const time = Date.now() - 200

    const result = checkIfOtpHasExpired(time)

    assert.isTrue(result)
  })
})
