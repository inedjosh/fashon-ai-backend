import { body } from 'express-validator'

export default [
  body('email').isEmail().withMessage('Please provide a valid email'),

  body('password')
    .isLength({ min: 7, max: 20 })
    .withMessage('Please provide a valid password not less than 7 digits long'),

  body('confirm_password')
    .exists()
    .withMessage('Confirm password field not present')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),

  body('first_name')
    .exists()
    .withMessage('Please provide first name')
    .notEmpty()
    .withMessage('First name field cannot be empty')
    .isString()
    .withMessage('First name shoud be a string'),

  body('last_name')
    .exists()
    .withMessage('Please provide last name')
    .notEmpty()
    .withMessage('Last name field cannot be empty')
    .isString()
    .withMessage('Last name shoud be a string.'),
]
