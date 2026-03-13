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

router.get("/login",userController.renderLoginForm);

//we use passport.authenticate middleware in post for authentication
router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect: '/login',failureFlash:true}),userController.login);

// for logout
router.get("/logout",userController.logout);



module.exports = router;