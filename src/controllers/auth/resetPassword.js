import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../../lib/passEmail.js";

import 'dotenv/config';

const BASE_URL = process.env.HOST_URL;

const sendResetLink = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({
      userEmail: email
    })
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;

    await user.save();

    await sendResetPasswordEmail(user.userEmail, "Password Reset Request", `
      <p>You have requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${BASE_URL}/api/v1/auth/forget-password/${resetToken}">${BASE_URL}/api/v1/auth/forget-password/${resetToken}</a>
    `);

    console.log(`Password reset email sent to ${user.userEmail} with reset token ${resetToken}`);

    return res.status(200).json({ message: "Password reset link sent to your email" });
  }
  catch (error) {
    console.error('Error in sendResetPasswordEmail:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const { newPassword } = req.body;


    const user = await User.findOne({
      resetToken: token
    })

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);


    user.userPassword = hashedPassword;
    user.resetToken = null;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" })
  }
  catch (error) {
    console.error('Error in resetPassword:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export { sendResetLink, resetPassword };