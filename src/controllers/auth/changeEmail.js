import User from "../../models/user.js";

const changeEmail = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const userId = req.userInfo.userId;

    if (newEmail === undefined) {
      return res.status(400).json({
        success: false,
        message: 'New email is required'
      })
    }

    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const checkExisting = await User.findOne({
      userEmail: newEmail
    })

    const updateEmail = await User.findByIdAndUpdate({
      _id: userId
    }, {
      userEmail: newEmail
    })

    if(updateEmail){
      return res.status(200).json({
        success: true,
        message: 'Email updated successfully'
      })
    }
  }
  catch (error) {
    console.error('Error in changing email :', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export default changeEmail;