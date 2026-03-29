import express from 'express';
import adminMiddleware from '../../middlewares/auth/adminMiddleware.js';
import authMiddleware from '../../middlewares/auth/authMiddleware.js';


const router = express.Router();

router.get('/home' , authMiddleware , adminMiddleware , (req , res) => {
  return res.status(200).json({
    success : true ,
    message : 'Welcome to the admin home page'
  })
})

export default router;