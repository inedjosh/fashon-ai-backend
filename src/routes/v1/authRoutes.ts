import { Router } from 'express'
import forgotPasswordController from '../../controllers/auth/forgotPasswordController'
import loginController from '../../controllers/auth/loginController'
import registerController from '../../controllers/auth/registerController'
import resendForgotPasswordController from '../../controllers/auth/resendForgotPasswordController'
import resetPasswordController from '../../controllers/auth/resetPasswordController'
import verifyEmailController from '../../controllers/auth/verifyEmailController'
import registerValidators from '../../helpers/validators/registerValidators'
import resetPasswordValidators from '../../helpers/validators/resetPasswordValidators'
import verifyValidators from '../../helpers/validators/verifyValidators'

const router = Router()

/** /v1/auth/ */
router.get('/', (req, res) => {
  return res.json({ message: 'User routes' })
})

/** /v1/auth/register */
router.post('/register', registerValidators, registerController)

/** /v1/auth/login */
router.post('/login', loginController)

/** /v1/auth/verify */
router.post('/verify', verifyValidators, verifyEmailController)

/** /v1/auth/forgot_password */
router.post('/forgot_password', forgotPasswordController)

/** /v1/auth/resendForgot_password */
router.post('/resend_forgot_password', resendForgotPasswordController)

/** /v1/auth/reset_password */
router.post('/reset_password', resetPasswordValidators, resetPasswordController)

export default router
