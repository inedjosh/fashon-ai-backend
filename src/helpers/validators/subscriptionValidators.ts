import { body } from 'express-validator'
export default [
  body('email').isEmail().withMessage('Please provide a valid email address.'),
  body('amount')
    .custom((val) => val === 49.99 || val === 10)
    .withMessage('Please seelct a valid payment option'),
]
