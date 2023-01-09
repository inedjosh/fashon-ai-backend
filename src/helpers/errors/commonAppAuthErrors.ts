import {
  sendBadRequestError,
  sendInternalServerError,
  sendUnAuthorizedError,
} from './commonAppErrors'

export const sendProvideUsernameError = () => {
  sendBadRequestError('Please provide username 🙂')
}

export const sendProvideEmailError = () => {
  sendBadRequestError("Please provide user's email 🙂")
}

export const sendProvideUsernameAndPasswordError = () => {
  sendBadRequestError('Please provide username and password 😞')
}

export const sendProvideUsernameAndOtpError = () => {
  sendBadRequestError('Please provide username and OTP 🙂')
}

export const sendUserAccountNotAvailableError = () => {
  sendBadRequestError(
    "You don't have an account on this platform 🙂, please proceed to signup"
  )
}

export const sendInvalidOtpError = () => {
  sendBadRequestError('Invalid OTP or OTP has expired 😔')
}

export const sendInvalidLoginCredentialsError = () => {
  sendBadRequestError('Invalid login credentials 🙂')
}

export const sendUserAccountNotActiveError = () => {
  sendUnAuthorizedError(
    'Hello! please proceed to activate your account or contact admin for assistance 🙂'
  )
}

export const sendRequestCouldNotBeCompletedError = () => {
  sendInternalServerError('Request could not be completed 😔please try again!')
}

// export const sendAccountAlreadyVerifiedError = () => {
//   return new AppError([], 422);
// };
