const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    family: 4,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 1. Send OTP for Signup Verification
const sendOTPEmail = async (email, username, otp) => {
    const mailOptions = {
        from: `"WanderNest" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your WanderNest Account",
        html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #fe424d; text-align: center;">Welcome to WanderNest!</h2>
                <p>Hello ${username},</p>
                <p>Thank you for signing up. Please verify your account using the OTP below:</p>
                <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; border-radius: 5px; margin: 20px 0; color: #333;">
                    ${otp}
                </div>
                <p style="color: #666; font-size: 0.9em;">This OTP is valid for 10 minutes. Do not share this code with anyone.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="text-align: center; color: #999; font-size: 0.8em;">© 2026 WanderNest. All rights reserved.</p>
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};

// 2. Send OTP for Password Reset
const sendResetOTPEmail = async (email, username, otp) => {
    const mailOptions = {
        from: `"WanderNest" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset your WanderNest Password",
        html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #fe424d; text-align: center;">Password Reset Request</h2>
                <p>Hello ${username},</p>
                <p>You requested a password reset. Please use the verification code below to reset your password:</p>
                <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; border-radius: 5px; margin: 20px 0; color: #333;">
                    ${otp}
                </div>
                <p style="color: #666; font-size: 0.9em;">This code is valid for 10 minutes. If you did not make this request, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="text-align: center; color: #999; font-size: 0.8em;">© 2026 WanderNest. All rights reserved.</p>
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};

// 3. Send Booking Confirmation
const sendBookingConfirmationEmail = async (email, username, booking) => {
    const mailOptions = {
        from: `"WanderNest" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Booking Confirmed - WanderNest",
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #fe424d; text-align: center;">Stay Confirmed! 🎉</h2>
                <p>Hello ${username},</p>
                <p>Your booking has been successfully confirmed. Here are your trip details:</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>Property:</strong> ${booking.listing.title}</p>
                    <p style="margin: 5px 0;"><strong>Check-In:</strong> ${new Date(booking.checkIn).toLocaleDateString("en-IN")}</p>
                    <p style="margin: 5px 0;"><strong>Check-Out:</strong> ${new Date(booking.checkOut).toLocaleDateString("en-IN")}</p>
                    <p style="margin: 5px 0;"><strong>Guests:</strong> ${booking.guests}</p>
                    <p style="margin: 5px 0;"><strong>Total Paid:</strong> ₹${booking.totalPrice.toLocaleString("en-IN")}</p>
                    <p style="margin: 5px 0; color: #666; font-size: 0.9em;"><strong>Booking ID:</strong> ${booking._id}</p>
                </div>
                
                <p>Wish you a wonderful journey! Pack your bags and get ready.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="text-align: center; color: #999; font-size: 0.8em;">© 2026 WanderNest. All rights reserved.</p>
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};

// 4. Send Booking Cancellation
const sendBookingCancellationEmail = async (email, username, bookingId) => {
    const mailOptions = {
        from: `"WanderNest" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Booking Cancelled - WanderNest",
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #fe424d; text-align: center;">Booking Cancelled</h2>
                <p>Hello ${username},</p>
                <p>Your reservation with Booking ID <strong>${bookingId}</strong> has been cancelled successfully.</p>
                
                <div style="background-color: #fdf2f2; border: 1px solid #fde8e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 5px 0; color: #9b1c1c;"><strong>Refund Status:</strong> Processing (will be credited within 5-7 business days)</p>
                </div>
                
                <p>If you have any questions, please contact our support team.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="text-align: center; color: #999; font-size: 0.8em;">© 2026 WanderNest. All rights reserved.</p>
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};

module.exports = {
    transporter,
    sendOTPEmail,
    sendResetOTPEmail,
    sendBookingConfirmationEmail,
    sendBookingCancellationEmail
};
