/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import logger from './../utils/logger'

type ApiRequest = {
  endpoint: string
  data?: object
  headers?: object
}

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.timeout = 25000000

export const getRequest = async ({ endpoint, headers }: ApiRequest) => {
  try {
    let response
    if (headers) {
      response = await axios.request({
        url: endpoint,
        method: 'GET',
        headers: { ...headers },
      })
    } else {
      response = await axios.get(endpoint)
    }

    return response
  } catch (error: any) {
    logger.error(
      `${error.response.status} ${JSON.stringify(error.response.data)}`
    )
    throw new Error(error.response)
  }
}

export const postRequest = async ({ endpoint, data, headers }: ApiRequest) => {
  try {
    let response
    if (headers) {
      response = await axios.request({
        url: endpoint,
        method: 'POST',
        data: data,
        headers: { ...headers },
      })
    } else {
      response = await axios.post(endpoint, { ...data })
    }

    return response
  } catch (error: any) {
    logger.error(
      `${error.response.status} ${JSON.stringify(error.response.data)}`
    )
    throw new Error(error)
  }
}

export const patchRequest = async ({ endpoint, data }: ApiRequest) => {
  try {
    const response = await axios.patch(endpoint, { ...data })
    return response
  } catch (error: any) {
    logger.error(
      `${error.response.status} ${JSON.stringify(error.response.data)}`
    )
    throw new Error(error)
  }
}

export const deleteRequest = async ({ endpoint }: ApiRequest) => {
  try {
    const response = await axios.delete(endpoint)
    return response
  } catch (error: any) {
    logger.error(
      `${error.response.status} ${JSON.stringify(error.response.data)}`
    )
    throw new Error(error)
  }
}
