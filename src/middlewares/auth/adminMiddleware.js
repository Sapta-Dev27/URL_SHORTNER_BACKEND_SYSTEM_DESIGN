import authMiddleware from "./authMiddleware.js";

const adminMiddleware = (req , res , next) => {
  try{
    const userrole = req.userInfo.userRoleFromAccessToken;
    if(userrole !== 'Admin'){
      return res.status(403).json({
        success : false ,
        message : 'Access denied. Admins only.'
      })
    }
    next();
  }
  catch(error){
    console.error('Error in adminMiddleware:', error);
    return res.status(500).json({
      success : false ,
      message : 'Error took place in adminMiddleware'
    })
  }
}

export default adminMiddleware;