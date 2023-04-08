import express from 'express';
import { login, otpCheck, otpResend, otpSend, registerUser } from '../Controllers/authControllers.js';
const router = express.Router()



router.post('/register-user', registerUser)

router.post('/login', login)

router.post('/otp-send', otpSend)

router.post('/otp-resend', otpResend)

router.post('/verify-otp', otpCheck)




export default router  