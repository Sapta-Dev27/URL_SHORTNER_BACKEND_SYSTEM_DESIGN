import User from '../../models/user.js';

const changeUserName = async (req, res) => {
  try {
    const { newUserName } = req.body;
    const userId = req.userInfo.userId;

    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const checkExisting = await User.findOne({
      userName: newUserName
    })

    if (checkExisting) {
      return res.status(400).json({
        success: false,
        message: 'UserName already exists'
      })
    }

    const updateUserName = await User.findByIdAndUpdate({
      _id: userId
    }, {
      userName: newUserName
    })

    if(updateUserName){
      return res.status(200).json({
        success: true,
        message: 'UserName updated successfully'
      })
    }

  }
  catch (error) {
    console.error('Error in changing userName :', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export default changeUserName;