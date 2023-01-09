import { Model, Types } from 'mongoose'

export type FactoryTypes = {
  model: Model<any>
  fields?: object
  query?: object
  limit?: number
  body?: object
  id?: Types.ObjectId | string
}
