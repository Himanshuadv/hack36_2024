const authController = require("./../controller/authController");
const express = require("express");
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/verify/:token", authController.verify);
router.get("/verify/:token", authController.verify);
router.post("/post",authController.protect,authController.post);
router.get("/check",authController.check);



// here is our entire post route and its logic

//get all post 

//post the post

router.post("/user/post")

module.exports = router;
