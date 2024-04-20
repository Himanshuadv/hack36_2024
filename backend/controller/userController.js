const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    result: users.length,
    data: {
      users,
    },
  });
});
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.getUser = catchAsync(async (req, res, next) => {
  const user = User.findById(req.params.id);
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // steps
  // 1) create error if user changes it password
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError("you cant change your password here", 400));
  }
  // update user data
  const filterBody = filterObj(req.body, "name", "email");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  // user.name = 'ujjwalBaranwal';
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});
