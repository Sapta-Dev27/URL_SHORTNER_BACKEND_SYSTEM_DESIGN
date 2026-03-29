import User from "../../models/user.js";
import bcrypt from 'bcrypt';
import generateAccessToken from "../../lib/accessToken.js";
import generateRefreshToken from "../../lib/refreshToken.js";


const loginController = async (req, res) => {
  try {

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    const findUser = await User.findOne({
      userEmail: email
    })

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const checkPassword = await bcrypt.compare(password, findUser.userPassword);

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      })
    }

    const accessToken  = generateAccessToken(findUser);
    const refreshToken = generateRefreshToken(findUser);

    return res.status(200).json({
      success : true ,
      message : 'User logged in successfully',
      data : findUser,
      accessToken,
      refreshToken  
    })
  }
  catch (error) {
    console.error("Error occurred while logging in:", error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while logging in. Please try again later.'
    })
  }
}


export default loginController;