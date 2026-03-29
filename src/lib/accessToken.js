import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY_ACCESS = process.env.JWT_SECRET_KEY_ACCESS;
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;
const JWT_SECRET_KEY_REFRESH = process.env.JWT_SECRET_KEY_REFRESH;


const generateAccessToken = (user) => {
  const payLoad = jwt.sign({
    userId: user._id,
    userNameFromAccessToken: user.userName,
    userEmailFromAccessToken: user.userEmail,
    userRoleFromAccessToken: user.userRole
  },
    JWT_SECRET_KEY_ACCESS, {
    expiresIn: JWT_ACCESS_EXPIRES_IN
  })

  return payLoad;
}

export default generateAccessToken;