import jwt from 'jsonwebtoken'
import configs from '../../config/config'

export const signPayload = (payload: any, secret: string) => {
  const token = jwt.sign({ ...payload }, secret, {
    expiresIn: configs.JWT_EXPIRES_IN,
  })

  return token
}

export const verifyJwt = async (jwtString: any, secret: string) => {
  const payload = await jwt.verify(jwtString, secret)

  return payload
}
