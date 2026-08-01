const User = require("../models/user");
const { generateOTP } = require("../utils/otpGenerator");
const { sendOTPEmail } = require("../utils/mailer");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const otp = generateOTP();
        const newUser = new User({ 
            email, 
            username,
            isVerified: false,
            otp,
            otpExpiry: Date.now() + 10 * 60 * 1000 // 10 mins
        });
        const registeredUser = await User.register(newUser, password);
        
        await sendOTPEmail(email, username, otp);
        
        req.session.verificationEmail = email;
        req.flash("success", "Welcome to WanderNest! An OTP has been sent to your email. Please verify your account.");
        res.redirect("/verify-otp");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderVerifyOtpForm = (req, res) => {
    if (!req.session.verificationEmail) {
        req.flash("error", "No verification session found. Please sign up or log in.");
        return res.redirect("/signup");
    }
    res.render("users/verifyOtp.ejs");
};

module.exports.verifyOtp = async (req, res, next) => {
    try {
        const { otp } = req.body;
        const email = req.session.verificationEmail;
        if (!email) {
            req.flash("error", "Session expired. Please signup or login again.");
            return res.redirect("/signup");
        }
        const user = await User.findOne({ email });
        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/signup");
        }
        
        if (user.otp === otp && user.otpExpiry > Date.now()) {
            user.isVerified = true;
            user.otp = undefined;
            user.otpExpiry = undefined;
            await user.save();
            delete req.session.verificationEmail;
            
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash("success", "Email verified successfully! Welcome to WanderNest.");
                res.redirect("/listings");
            });
        } else {
            req.flash("error", "Invalid or expired OTP. Please try again.");
            res.redirect("/verify-otp");
        }
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/verify-otp");
    }
};

module.exports.resendOtp = async (req, res) => {
    try {
        const email = req.session.verificationEmail;
        if (!email) {
            req.flash("error", "Session expired. Please sign up or log in again.");
            return res.redirect("/signup");
        }
        const user = await User.findOne({ email });
        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/signup");
        }
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
        await user.save();
        
        await sendOTPEmail(email, user.username, otp);
        req.flash("success", "A new OTP has been sent to your email.");
        res.redirect("/verify-otp");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/verify-otp");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res, next) => {
    if (!req.user.isVerified) {
        const email = req.user.email;
        const user = req.user;
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();
        
        await sendOTPEmail(email, user.username, otp);
        req.session.verificationEmail = email;
        
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            req.flash("error", "Your account is not verified. A new OTP has been sent to your email.");
            res.redirect("/verify-otp");
        });
        return;
    }
    
    req.flash("success", "Welcome back to WanderNest!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out sucessfully");
        res.redirect("/listings");
    })
};


