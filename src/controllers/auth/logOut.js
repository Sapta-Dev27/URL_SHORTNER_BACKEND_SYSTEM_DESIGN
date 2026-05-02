import User from "../../models/User.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const logOut = async(req , res) => {
  try {
    const token = req.cookies.accessToken;
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY_ACCESS);

    if( !decode){
      return res.status(403).json({
        success: false,
        message: 'Invalid token'
      })
    }

    const user = await User.findById(decode.userId);
    if(!user){
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    })

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export default logOut;