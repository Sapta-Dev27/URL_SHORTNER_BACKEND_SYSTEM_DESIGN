import jwt from 'jsonwebtoken';
import 'dotenv/config';


const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_SECRET_KEY_ACCESS;

const authMiddleware = (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    if (headers == undefined) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header is missing'
      })
    }

    const token = headers.split(" ")[1];
    console.log('Token:', token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token is missing'
      })
    }

    const decodedToken = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
    console.log('Decoded Token:', decodedToken);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      })
    }
    req.userInfo = decodedToken;
    next();
  }
  catch (error) {
    console.error('Error in authMiddleware:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }

}

export default authMiddleware;