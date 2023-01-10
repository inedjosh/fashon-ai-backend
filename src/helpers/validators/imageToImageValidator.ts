import { body } from 'express-validator'
export default [
  body('image').exists().withMessage('Please provide an image'),
  body('email').isEmail().withMessage('Please provide a valid email'),
]
