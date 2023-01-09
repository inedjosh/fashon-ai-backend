import UserModel from '../../models/User'
import { findOneFactory } from '../factories/factories'

export default async (userEmail: string) => {
  const user = await findOneFactory(UserModel, { email: userEmail })

  return user
}
