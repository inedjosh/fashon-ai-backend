import configs from './../config/config'
import { getRequest, postRequest } from './../helpers/apiRequests'

const authHeader = `Authorization: Bearer ${configs.PAYSTACK_SECRET_KEY}`

export const initializeCharge = async ({
  email,
  amount,
}: {
  email: string
  amount: number
}) => {
  const url = 'https://api.paystack.co/transaction/initialize'

  const response = await postRequest({
    endpoint: url,
    data: { email, amount },
    headers: {
      headers: `Authorization: Bearer ${configs.PAYSTACK_SECRET_KEY}`,
    },
  })

  return response.data
}

export const verifyTransaction = async (reference: string) => {
  const url = `https://api.paystack.co/transaction/verify/:${reference}`

  const response = await getRequest({
    endpoint: url,
    headers: { headers: authHeader },
  })

  return response.data
}
