import bcrypt from 'bcryptjs'
import logger from '../logger'

export const hashString = async (string: string) => {
  const hash = bcrypt.hashSync(string, 10)

  return hash
}

export const compareString = async ({
  string,
  hash,
}: {
  string: string
  hash: string
}) => {
  const result = await bcrypt.compare(string, hash)
  logger.info(result)
  return result
}
