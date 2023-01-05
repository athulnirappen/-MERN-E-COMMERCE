const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//register a user

const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample id",
            url:"profilepicUrl"
        }
    })

    res.status(201).json({
        success: true,
        user,
    })
})

module.exports={registerUser}