const User = require("../models/user");
const { generateOTP } = require("../utils/otpGenerator");
const { sendOTPEmail, sendResetOTPEmail } = require("../utils/mailer");

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
        console.error("Signup Error:", e);
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
        console.error("Signup Error:", e);
        req.flash("error", e.message);
        res.redirect("/signup");
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
        console.error("Signup Error:", e);
        req.flash("error", e.message);
        res.redirect("/signup");
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

// FORGOT PASSWORD FLOW
module.exports.renderForgotPassword = (req, res) => {
    res.render("users/forgotPassword.ejs");
};

module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            req.flash("error", "Email not registered.");
            return res.redirect("/forgot-password");
        }

        const otp = generateOTP();
        user.resetOtp = otp;
        user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
        await user.save();

        await sendResetOTPEmail(email, user.username, otp);

        req.session.resetEmail = email;
        req.flash("success", "OTP sent successfully.");
        res.redirect("/verify-reset-otp");
    } catch (e) {
        console.error("Signup Error:", e);
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderVerifyResetOtp = (req, res) => {
    if (!req.session.resetEmail) {
        req.flash("error", "Session expired. Please request a new OTP.");
        return res.redirect("/forgot-password");
    }
    res.render("users/verifyResetOtp.ejs");
};

module.exports.verifyResetOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const email = req.session.resetEmail;

        if (!email) {
            req.flash("error", "Session expired. Please request a new OTP.");
            return res.redirect("/forgot-password");
        }

        const user = await User.findOne({ email });
        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/forgot-password");
        }

        if (user.resetOtp === otp && user.resetOtpExpiry > Date.now()) {
            req.session.allowPasswordReset = true;
            req.flash("success", "OTP verified. Please enter your new password.");
            res.redirect("/reset-password");
        } else {
            req.flash("error", "Invalid OTP or OTP expired.");
            res.redirect("/verify-reset-otp");
        }
    } catch (e) {
        console.error("Signup Error:", e);
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderResetPassword = (req, res) => {
    if (!req.session.allowPasswordReset) {
        req.flash("error", "Please verify OTP first.");
        return res.redirect("/forgot-password");
    }
    res.render("users/resetPassword.ejs");
};

module.exports.resetPassword = async (req, res) => {
    try {
        if (!req.session.allowPasswordReset) {
            req.flash("error", "Please verify OTP first.");
            return res.redirect("/forgot-password");
        }

        const { password, confirmPassword } = req.body;
        const email = req.session.resetEmail;

        if (password !== confirmPassword) {
            req.flash("error", "Passwords do not match.");
            return res.redirect("/reset-password");
        }

        const user = await User.findOne({ email });
        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/forgot-password");
        }

        await user.setPassword(password);
        user.resetOtp = undefined;
        user.resetOtpExpiry = undefined;
        await user.save();

        delete req.session.resetEmail;
        delete req.session.allowPasswordReset;

        req.flash("success", "Password updated successfully. Please log in.");
        res.redirect("/login");
    } catch (e) {
        console.error("Signup Error:", e);
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};
