import User from "../../models/user.js";
import 'dotenv/config'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateAccessToken from "../../lib/accessToken.js";
import generateRefreshToken from "../../lib/refreshToken.js";
import { sendVerificationEmail, sendSuccessEmail } from "../../lib/verifyEmail.js";

const getUrl = process.env.HOST_URL;

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
    const refreshToken = generateRefreshToken(newUser);
    const verificationLink = `${getUrl}/api/v1/auth/verify-email?token=${refreshToken}`;

    await sendVerificationEmail(newUser.userEmail, "Please verify your email",
      `<p>Thank you for registering . Plese click the link below to verify your email : </p>
       <a href="${verificationLink}">${verificationLink}</a>`
    )
    

    

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: newUser,
      isEmailVerified: newUser.isEmailVerified,
      accessToken: accesToken,
      refreshToken: refreshToken
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


const verifyEmailController = async (req, res) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is missing'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_REFRESH);

    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: ' Invalid or expired token . Verification failed '
      })
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    user.isEmailVerified = true;
    await user.save();

    await sendSuccessEmail(user.userEmail, "Email Verified Successfully . Please login to your account .",
      `<p>Dear ${user.userName} , </p>
       <p>Your email has been successfully verified. You can now log in to your account and start using our services.</p>
       <p>For logging in . Click the link below : </p>
       <a href = "${getUrl}/api/v1/auth/login">${getUrl}/api/v1/auth/login</a>
       <p>Thank you for joining us!</p>
      `
    )

    return res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    })
  }
  catch (error) {
    console.log('Error in verifyEmailController:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}


export { registerController, verifyEmailController };