import bcrypt from 'bcryptjs'

export const hashString = async (string: string) => {
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(string, salt)
  return hashed
}

export const compareString = async ({
  string,
  hash,
}: {
  string: string
  hash: string
}) => {
  const result = await bcrypt.compare(string, hash)
  return result
}
