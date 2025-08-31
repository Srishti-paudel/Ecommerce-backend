import bcrypt from 'bcrypt';
import db from "../database/connection.js";
import generateToken from '../services/generateToken.js';
import generateOtp from '../services/generateOtp.js';
import { sendMail } from '../services/sendMail.js';

const User = db.users;

// const User = {}

//  function to send response
const sendResponse = (res, status, message) => {
    res.status(status).json({ message });
};

//  function to find user by email
const findData = async (User, email) => {
    const [user] = await User.findAll({ where: { email } });
    return user;
};

// function to check OTP expiration
const checkOtpExpiration = (res, otpGeneratedTime, expiryTime) => {
    const now = Date.now();
    if (now - otpGeneratedTime > expiryTime) {
        sendResponse(res, 400, "OTP expired");
        return false;
    }
    sendResponse(res, 200, "OTP verified successfully");
    return true;
};

// REGISTER
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ message: "Please provide username, email, and password" });
    }

    const existingUser = await User.findAll({ where: { email } });
    if (existingUser.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
    }

    await User.create({
        userName,
        email,
        password: bcrypt.hashSync(password, 12),
    });

    res.status(200).json({ message: "User registered successfully" });
};

export default registerUser;

// LOGIN
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    const [user] = await User.findAll({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: "No user exists with that email" });
    }

    const isEqual = bcrypt.compareSync(password, user.password);
    if (!isEqual) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken(user.id);
    res.status(200).json({ message: "Login successful", token });
};

// FORGOT PASSWORD
export const handlePassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Please provide email" });

    const user = await findData(User, email);
    if (!user) return res.status(404).json({ message: "Email not registered" });

    const otp = generateOtp();
    await sendMail({
        to: email,
        subject: "Gharmai Saman Password Reset Request",
        text: `Here's your OTP: ${otp}`,
    });

    user.otp = otp;
    user.otpGeneratedTime = Date.now();
    await user.save();

    res.status(200).json({ message: "Password reset OTP sent!" });
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
    const { otp, email } = req.body;
    if (!otp || !email) return sendResponse(res, 400, "Please provide OTP and email");

    const user = await findData(User, email);
    if (!user) return sendResponse(res, 404, "No user with that email");

    if (user.otp !== otp) return sendResponse(res, 400, "Invalid OTP");

    checkOtpExpiration(res, user.otpGeneratedTime, 120000);
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
    const { newPassword, confirmPassword, email } = req.body;
    if (!newPassword || !confirmPassword || !email) {
        return sendResponse(res, 400, "Please provide newPassword, confirmPassword, and email");
    }

    if (newPassword !== confirmPassword) {
        return sendResponse(res, 400, "New password and confirm password must be the same");
    }

    const user = await findData(User, email);
    if (!user) return sendResponse(res, 404, "No user with that email");

    user.password = bcrypt.hashSync(newPassword, 12);
    await user.save();
    sendResponse(res, 200, "Password reset successfully!");
};
