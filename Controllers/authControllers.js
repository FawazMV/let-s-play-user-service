import user_Model from '../Models/User_Model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { otpcallin, verifyOtp } from '../Helpers/Otp.js'

export const login = async (req, res, next) => {
    try {
        const user = await user_Model.findOne({ email: req.body.email }).catch(err => next(err))
        if (!user) return res.status(401).json({ message: "Invalid credentials." });
        const isMatch = await bcrypt.compare(req.body.password, user.password).catch(err => next(err))
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials.." });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({ token });
    }
    catch (err) {
        return res.status(500).json({ error: "Internal Server Error !" })
    }
}

export const registerUser = async (req, res, next) => {
    try {
        const { username, password, email, mobile } = req.body
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new user_Model({
            username, email, mobile,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(201).json({ message: "User created" });
    }
    catch (err) {
        next(err);
    }
}


export const otpSend = async (req, res) => {
    try {
        const user = await user_Model.findOne({ email: req.body.email }).catch(err => next(err))
        if (user) return res.status(409).json({ message: "User already exists" })
        const mobile = await user_Model.findOne({ mobile: req.body.mobile }).catch(err => next(err))
        if (mobile) return res.status(409).json({ message: "Mobile Number already registred" })
        otpcallin(req.body.mobile)
        return res.status(200).json({ message: `OTP send to ${req.body.mobile}` });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error !" })
    }
}

export const otpCheck = async (req, res, next) => {
    try {
        const { mobile, otp } = req.body;
        const response = await verifyOtp(mobile, otp).catch(error => next(error))
        if (!response) return res.status(400).json({ message: "Invalid OTP" })
        else return res.status(200).json({ message: 'otp verified' })

    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error !" })
    }
}


export const otpResend = (req, res, next) => {
    try {
        otpcallin(req.body.mobile)
        return res.status(200).json({ message: `OTP send to ${req.body.mobile}` });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error !" })
    }
}