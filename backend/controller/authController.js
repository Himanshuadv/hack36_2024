const { promisify } = require("util"); // builtin util module for promising... extracting promisify from the util
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const crypto = require("crypto");
const { env } = require("process");
const nodemailer = require('nodemailer');
const Post = require('./../models/PostModel');


const EMAIL = "python.user739@gmail.com"
const PASSWORD = "cend hzew sxnn hcwq"

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookiOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "Strict",
  };
  // if (process.env.NODE_ENV === "production") {cookiOption.secure = true  cookiOption.sameSite='None'};
  if (process.env.NODE_ENV === "production") {
    // these options work on a https server
    cookiOption.secure = true;
    cookiOption.sameSite = "None";
  }
  ///// remove the  user password from the output
  user.password = undefined;

  res.cookie("jwt", token, cookiOption);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  //   const newUser = await User.create(req.body); /// this line is flaw because if someone wants to enter as the admin then just he/she could assign themselves as the admin and can enter
  const {name,email,password}=req.body;
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const newUser = await User.create({name,email,password,verificationToken});
    const encodedToken = encodeURIComponent(verificationToken);
    const verificationLink = `http://localhost:3000/api/v1/users/verify/${encodedToken}`;
    const transporter = nodemailer.createTransport({
      service:'Gmail',
      host:'smtp.gmail.com',
      port:465,
      auth:{
        user:EMAIL,
        pass:PASSWORD
      }
    });
    const mailOption = {
      from:EMAIL,
      to:email,
      subject:'Account Verification',
      html:`Click <a href ="${verificationLink}">here</a> to verify your Account.`
    };

    await transporter.sendMail(mailOption,(error,info)=>{
      if(error){
        console.log(error);
        res.status(500).json({success: false,message:'Error sending verification email'});
      }else{
        console.log('Verification email sent: '+ info.response);
        createAndSendToken(newUser, 201, res);
        // res.status(200).json({success:true,message:'Verification email sent successfully'});
      }
    })
  
  // console.log("error is not here");
  
});

exports.verify = catchAsync(async (req, res, next) => {
  console.log("hello");
  const {token} = req.params;
  console.log(token);
  const user = await User.findOne({verificationToken: token});
  if (!user || user.isVerified) {
    return res.status(404).json({ success: false, message: 'Invalid verification token.' });
  }
  user.isVerified = true;
    await user.save();
    res.status(200).send('Account verified successfully.');
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //   steps
  /////////// 1 check if email and password exist
  if (!email || !password) {
    return next(new AppError("please provide email or password", 400));
  }
  //////////  2 chack if user exist and password is correct
  const user = await User.findOne({ email }).select("+password"); // if user is not there then it takes to much time and cant proceed further so i put correct statement in the if col
  console.log(user);
  //   const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password)) || !user.isVerified) {
    return next(new AppError("Email id or Password is incorrect"), 401);
  }

  createAndSendToken(user, 200, res);
});

// creating a logout function
exports.logout = catchAsync(async (req, res, next) => {
  // in this we create a new cookie which replace the old cookie with no user data so its look like the user is log out
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 100),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});

exports.check = catchAsync(async (req, res, next) => {
  let token=req.cookies.jwt;
    if(token==undefined){
      return res.status(500).send({message:'token is not valid'});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
      return res.status(500).send({message:'token is not valid'});
    }

    res.status(200).send({message:'token is valid'});

});
/// creating protect middle ware for the protected routes

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  console.log(req.cookies.jwt);
  /////// 1 get the token and checking it exist
  // we always send token in header name -- 'authorization' and the its value always start with -- 'Bearer' .. its just a common proceddure
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // above code is because headers authorization looks like ..... authorization : 'Bearer jlsdfj;alkd' so splits it on the basis of spaces and the take the value at one position for the value of token
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log("token :", token);
  console.log("oye: ",req.cookie);
  if (!token) {
    return next(new AppError("invalid token... you are not logged in", 401));
  }
  //////  2 varification token

  // .verify send promise
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  /////   3 check if user exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(new AppError("token belonging to the user doesnot exist", 401));
  /////   4 if user change password after the token is issued
  //// note:- currently this function is not working ........ isko future mai shi krna hai
  // if (await freshUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError("User currently changed password . please log in again", 401)
  //   );
  
  // grant access to the protected route
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
});

/// creating restric middleware
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("you dont have a permission do to this", 403));
    next();
  };
};


// ---------  posting logic -------------//

exports.post = catchAsync(async(req,res,next)=>{
  const {tag,content,id} = req.body;
  if(tag.length==0){
    tag=[general]
  }

  if(content.trim()=""){
    return res.status(500).json({status:"failure",message: "Please some content some tags"})
  }else {
    //now we will save the post 
  const newPost = await Post.create({tag,content,user:id});
  
  res.status(200).json({ status: "success" });
  }
  
  
})
