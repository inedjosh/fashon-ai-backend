/* eslint-disable @typescript-eslint/no-explicit-any */
export default (errorMessagesObject: Array<object>) => {
  const messages: Array<string> = []

  errorMessagesObject.forEach((obj: any) => {
    messages.push(obj.msg)
  })

  return messages
}
