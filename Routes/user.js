const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const{saveRedirectUrl} = require("../middleware.js")

const userController = require("../controllers/users.js");

router.get("/signup",userController.renderSignupForm);

// for post we using async because we are going save record in db and all 
router.post("/signup",WrapAsync(userController.signup));

// OTP Verification Routes
router.get("/verify-otp", userController.renderVerifyOtpForm);
router.post("/verify-otp", WrapAsync(userController.verifyOtp));
router.post("/resend-otp", WrapAsync(userController.resendOtp));

router.get("/login",userController.renderLoginForm);

//we use passport.authenticate middleware in post for authentication
router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect: '/login',failureFlash:true}),userController.login);

// for logout
router.get("/logout",userController.logout);

// Forgot Password Routes
router.get("/forgot-password", userController.renderForgotPassword);
router.post("/forgot-password", WrapAsync(userController.forgotPassword));

router.get("/verify-reset-otp", userController.renderVerifyResetOtp);
router.post("/verify-reset-otp", WrapAsync(userController.verifyResetOtp));

router.get("/reset-password", userController.renderResetPassword);
router.post("/reset-password", WrapAsync(userController.resetPassword));

module.exports = router;