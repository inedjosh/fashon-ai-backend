import { body } from 'express-validator'

export default [
  body('email').isEmail().withMessage('Please provide a valid email 😔'),

  body('verificationCode')
    .exists()
    .withMessage('Please provide a valid verification string')
    .isLength({ min: 9, max: 11 })
    .withMessage('Please provide a valid verification string'),
]
