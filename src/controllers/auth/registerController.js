import User from "../../models/user.js";
import 'dotenv/config'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateAccessToken from "../../lib/accessToken.js";
import generateRefreshToken from "../../lib/refreshToken.js";

const registerController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    const checkExistingUser = await User.findOne({
      $or: [{
        userName: username
      }, {
        userEmail: email
      }]
    })

    if (checkExistingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with the same username or email already exists'
      })
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      userName: username,
      userEmail: email,
      userPassword: hashedPassword,
      userRole: role
    })

    const accesToken = generateAccessToken(newUser);
    const refeshToken = generateRefreshToken(newUser);


    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: newUser,
      accessToken: accesToken,
      refreshToken: refeshToken
    })

  }
  catch (error) {
    console.log('Error in registerController:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}


export default registerController;