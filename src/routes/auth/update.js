import express from 'express';
import changeEmail from '../../controllers/auth/changeEmail.js';
import changeUserName from '../../controllers/auth/changeUserName.js';

import authMiddleware from '../../middlewares/auth/authMiddleware.js';
import adminMiddleware from '../../middlewares/auth/adminMiddleware.js';

import infoMiddleware from '../../middlewares/infoMiddleware.js';

const router = express.Router();

router.patch('/change-email', infoMiddleware, authMiddleware, adminMiddleware, changeEmail);
router.patch('/change-username', infoMiddleware, authMiddleware, adminMiddleware, changeUserName);

export default router;