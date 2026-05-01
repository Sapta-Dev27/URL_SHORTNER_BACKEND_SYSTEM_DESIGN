import User from "../../models/user.js";
import jwt from 'jsonwebtoken';

import generateAccessToken from "../../lib/accessToken.js";
import generateRefreshToken from "../../lib/refreshToken.js";

const tokenHandler = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(403).json({
        success: false,
        message: 'Token is missing'
      })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY_REFRESH);

    if (!decode) {
      return res.status(403).json({
        sucess: false,
        message: 'Invalid token'
      })
    }

    const user = await User.findById(decode.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    if (user.refreshToken !== token) {
      return res.status(403).json({
        success: false,
        message: 'Invalid token. Token didnot match with the user DB'
      })
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    })

    return res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    })
  }
  catch (error) {
    console.log('Error in refresh token handler:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export default tokenHandler;