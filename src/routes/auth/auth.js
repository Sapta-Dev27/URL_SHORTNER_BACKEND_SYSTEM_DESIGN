import express from 'express'

import loginController from '../../controllers/auth/loginController.js';
import infoMiddleware from '../../middlewares/infoMiddleware.js';
import { verifyEmailController  , registerController} from '../../controllers/auth/registerController.js';

const router = express.Router();

router.post('/register', infoMiddleware, registerController);
router.post('/login', infoMiddleware, loginController);
router.get('/verify-email', verifyEmailController);

export default router;