import express from 'express'
import registerController from '../../controllers/auth/registerController.js';
import loginController from '../../controllers/auth/loginController.js';
import infoMiddleware from '../../middlewares/infoMiddleware.js';

const router = express.Router();

router.post('/register', infoMiddleware, registerController);
router.post('/login', infoMiddleware, loginController);

export default router;