export default (otpExpiryTime: string | number): boolean => {
  const now = Date.now()
  const otpDate = new Date(otpExpiryTime).getTime()

  if (otpDate < now) {
    return true
  }

  return false
}
