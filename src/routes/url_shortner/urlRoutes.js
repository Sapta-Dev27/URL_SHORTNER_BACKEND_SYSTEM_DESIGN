import express from "express";
import { createShortURL, fetchALLUrls, redirectURL, deleteURL } from "../../controllers/url_shortner/urlController.js";



import authMiddleware from "../../middlewares/auth/authMiddleware.js";
import adminMiddleware from "../../middlewares/auth/adminMiddleware.js";
import infoMiddleware from "../../middlewares/infoMiddleware.js";


const router = express.Router();

router.post('/shorten', infoMiddleware, authMiddleware, adminMiddleware, createShortURL);
router.get('/all', infoMiddleware, authMiddleware, adminMiddleware, fetchALLUrls);
router.get('/redirect/:shortedID', infoMiddleware, redirectURL);
router.delete('/delete/:id', infoMiddleware, authMiddleware, adminMiddleware, deleteURL);

export default router;