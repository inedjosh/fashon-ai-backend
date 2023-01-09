export type SendEmail = {
  reciepient: string
  mailData: object
  subject: string
  mailTemplate: string
}

export type ApiRequest = {
  endpoint: string
  data?: object
  headers?: object
}
