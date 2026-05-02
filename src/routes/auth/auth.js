import express from 'express'

import loginController from '../../controllers/auth/loginController.js';
import infoMiddleware from '../../middlewares/infoMiddleware.js';
import { verifyEmailController  , registerController} from '../../controllers/auth/registerController.js';
import tokenHandler from '../../controllers/auth/refreshTokenHandler.js';
import logOut from '../../controllers/auth/logOut.js';
import { sendResetLink, resetPassword } from '../../controllers/auth/resetPassword.js';

const router = express.Router();

router.post('/register', infoMiddleware, registerController);
router.post('/login', infoMiddleware, loginController);
router.post('/refresh-token', tokenHandler);
router.get('/verify-email', verifyEmailController);
router.post('/logout', logOut);
router.post('/reset-password', sendResetLink);
router.put('/forget-password/:token', resetPassword);

export default router;