import express from 'express'
import registerUser, {  loginUser, handlePassword,  resetPassword, verifyOtp } from '../controller/userController.js'
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(handlePassword)
router.route("/verify-otp").post(verifyOtp)
router.route("/reset-password").post(resetPassword)
export default router