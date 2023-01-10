import { body } from 'express-validator'
export default [
  body('prompt').exists().withMessage('Please provide a valid prompt'),
  body('email').isEmail().withMessage('Please provide a valid email'),
]
