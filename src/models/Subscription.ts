import { model, Document, Schema } from 'mongoose'
import { UserDocument } from './User'

export interface SubscriptionDocument extends Document {
  userId: UserDocument['id']
  trx_reference: string
  amount: number
  trx_id: string
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
    required: true,
  },
  trx_id: {
    type: String,
    required: true,
  },
  trials: {
    type: Number,
    required: true,
  },
})

const SubscriptionModel = model<SubscriptionDocument>(
  'Subscription',
  SubscriptionSchema
)
export default SubscriptionModel
