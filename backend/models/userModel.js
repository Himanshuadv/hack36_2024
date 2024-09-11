const crypto = require("crypto"); //built-in module for generating token
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please entered the name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please entered the email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "pls entered valid email"],
  },

  password: {
    type: String,
    required: [true, "pls entered the password "],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified:{
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  changedPasswordAt: Date,
  passwordResetToken: String,
  passwordResetExpire: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// / creating the encryption of the password
userSchema.pre("save", async function (next) {
  // only run in the case when the password was actully modified
  if (!this.isModified("password")) return next();
  // hashing the password with the cpy cost 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete the password confirm field
  this.confirmPassword = undefined;
  next();
});

/// creating the decryption of the password
// this method is instance method its mean its available in whole file
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
 
  return await bcrypt.compare(candidatePassword, userPassword);
};




//-------------------------------------------------------------------- ADDED 01 June  -------------------------------------------------------------------


userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.changedPasswordAt) {
    const changedTimeStamp = parseInt(
      this.changedPasswordAt.getTime() / 1000,
      10,
    );
    console.log(changedTimeStamp, JWTTimeStamp);
    return JWTTimeStamp < changedTimeStamp;
  }
  // false mean password is not used
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model('User', userSchema);


module.exports = User;
