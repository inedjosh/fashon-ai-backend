import { model, Document, Schema } from 'mongoose'
import { UserDocument } from './User'

export interface SubscriptionDocument extends Document {
  userId: UserDocument['id']
  trx_reference: string
  amount: number
  trials: number
}

export const SubscriptionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trx_reference: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
  },
  trials: {
    type: Number,
  },
})

const SubscriptionModel = model<SubscriptionDocument>(
  'Subscription',
  SubscriptionSchema
)
export default SubscriptionModel
