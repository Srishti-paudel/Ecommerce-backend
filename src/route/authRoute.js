import express from 'express'
import registerUser, {  loginUser, handlePassword,  resetPassword, verifyOtp } from '../controller/userController.js'
const router = express.Router({ strict: false })

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/forgot-password", handlePassword)
router.post("/verify-otp", verifyOtp)
router.post("/reset-password", resetPassword)

export default router