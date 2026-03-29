import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  userEmail: {
    type: String,
    unique: true,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true
  })


const User = new mongoose.model('User', userSchema);
export default User;