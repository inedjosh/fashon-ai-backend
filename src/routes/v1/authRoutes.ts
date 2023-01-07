import { Router } from 'express'
import loginController from '../../controllers/auth/loginController';
import registerController from '../../controllers/auth/registerController';
import verifyEmailController from '../../controllers/auth/verifyEmailController';
import registerValidators from '../../helpers/validators/registerValidators';
import verifyValidators from '../../helpers/validators/verifyValidators';

const router =  Router()

/** /v1/auth/ */
router.get("/", (req, res) => {
  return res.json({ message: "User routes" });
});

/** /v1/auth/register */
router.post('/register', registerValidators, registerController)

/** /v1/auth/login */
router.post("/login", loginController);

/** /v1/auth/verify */
router.post("/verify", verifyValidators, verifyEmailController);


export default router;