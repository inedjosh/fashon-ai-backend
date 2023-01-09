import { body } from 'express-validator'

export default [
  body('email').isEmail().withMessage('Please provide a valid email'),

  body('otp')
    .exists()
    .withMessage('Please provide a OTP')
    .isLength({ min: 5, max: 5 })
    .withMessage('OTP must be 5 digits'),

  body('password')
    .isLength({ min: 7, max: 20 })
    .withMessage('Please provide a valid password not less than 7 digits long'),

  body('confirm_password')
    .exists()
    .withMessage('Confirm password field not present')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
]
