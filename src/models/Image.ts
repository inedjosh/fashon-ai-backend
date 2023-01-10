import { Schema, Document, model } from 'mongoose'
import { UserDocument } from './User'

export interface ImageDocument extends Document {
  userId: UserDocument['id']
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

const ImageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const ImageModel = model<ImageDocument>('Image', ImageSchema)

export default ImageModel
