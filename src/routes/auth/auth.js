import express from 'express'

import loginController from '../../controllers/auth/loginController.js';
import infoMiddleware from '../../middlewares/infoMiddleware.js';
import { verifyEmailController  , registerController} from '../../controllers/auth/registerController.js';
import tokenHandler from '../../controllers/auth/refreshTokenHandler.js';

const router = express.Router();

router.post('/register', infoMiddleware, registerController);
router.post('/login', infoMiddleware, loginController);
router.post('/refresh-token', tokenHandler);
router.get('/verify-email', verifyEmailController);

export default router;