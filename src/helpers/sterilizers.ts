import { UserDocument } from '../models/User'

export const sterilizeUserObj = (obj: UserDocument) => {
  return {
    first_name: obj.first_name,
    last_name: obj.last_name,
    email: obj.email,
    role: obj.role,
    account_verified: obj.account_verified,
    trials: 3,
  }
}

export const sterilizeCharge = (obj: any) => {
  return {
    amount: obj.data.amount,
    paid_at: obj.data.paid_at,
    channel: obj.data.channel,
    currency: obj.data.currency,
    reference: obj.data.reference,
  }
}
