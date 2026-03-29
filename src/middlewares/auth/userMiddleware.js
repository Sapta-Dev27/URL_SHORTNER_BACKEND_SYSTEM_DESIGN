import authMiddleware from './authMiddleware.js';


const userMiddleware = (req, res , next) => {
  try{
    const userrole = req.userInfo.userRoleFromAccessToken;
    if(userrole !== 'User'){
      return res.status(403).json({
        success : false ,
        message : 'Access denied. Users only.'
      })
    }
    next();
  }
  catch(error){
    console.error('Error in userMiddleware:', error);
    return res.status(500).json({
      success : false ,
      message : 'Error took place in userMiddleware'
    })
  }
}

export default userMiddleware;