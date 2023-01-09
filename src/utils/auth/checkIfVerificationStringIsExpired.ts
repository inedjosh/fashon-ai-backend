import checkIfStringhasExpired from '../../helpers/checkIfStringhasExpired'
import { compareString } from './hash'

export default async (
  string: string,
  dbString: string,
  stringExpiryTime: Date
) => {
  const stringMatches = await compareString({ string: string, hash: dbString })
  const hasExpired = checkIfStringhasExpired(stringExpiryTime)

  if (stringMatches && !hasExpired) {
    return true
  }

  return false
}
