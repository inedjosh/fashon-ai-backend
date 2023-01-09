import jwt from 'jsonwebtoken'
import configs from '../../config/config'

export const signPayload = (payload: any) => {
  const token = jwt.sign({ ...payload }, configs.JWT_SECRET, {
    expiresIn: configs.JWT_EXPIRES_IN,
  })

  return token
}

export const verifyJwt = async (jwtString: any) => {
  const payload = await jwt.verify(jwtString, configs.JWT_SECRET)

  return payload
}
