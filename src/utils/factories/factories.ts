/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose'
import { FactoryTypes } from './types'

export const createOneFactory = async ({ model, fields }: FactoryTypes) => {
  const doc = await model.create({ ...fields })
  return doc
}

export const findOneFactory = async (model: Model<any>, query: any) => {
  const doc = await model.findOne({ ...query })
  return doc
}

export const findManyFactory = async ({
  model,
  query,
  limit = 30,
}: FactoryTypes) => {
  const docs = await model
    .find({ ...query })
    .limit(limit)
    .sort({ createdAt: -1 })
  return docs
}

export const findByIdFactory = async (
  model: Model<any>,
  id: Types.ObjectId | string
) => {
  const doc = await model.findById(id)
  return doc
}

export const updateOneFactory = async ({
  model,
  query,
  body,
}: FactoryTypes) => {
  const doc = await model.updateOne({ ...query }, { ...body })
  return doc
}

export const findByIdAndUpdateFactory = async ({
  model,
  id,
  body,
}: FactoryTypes) => {
  const doc = await model.findByIdAndUpdate(id, body, {
    new: true,
  })
  return doc
}

export const findAllFactory = async ({ model }: FactoryTypes) => {
  const docs = await model.find({}).sort({ createdAt: -1 })
  return docs
}

export const deleteOneFactory = async (model: Model<any>, query: any) => {
  const result = await model.deleteOne({ ...query })
  return result
}
