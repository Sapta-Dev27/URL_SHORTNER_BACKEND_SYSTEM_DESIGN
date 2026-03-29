import express from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware.js';
import userMiddleware from '../../middlewares/auth/userMiddleware.js';


const router = express.Router();

router.get('/home' , authMiddleware , userMiddleware , (req , res)  => {
  return res.status(200).json({
    success : true ,
    message : 'Welcome to the user home page'
  })
})

export default router;