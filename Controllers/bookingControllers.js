import { Axiosbooking as axios } from "../Helpers/Axiosinstance.js";
import usermodel from "../Models/User_Model.js";

export const bookSlot = async (req, res, next) => {
    try {
        const body = req.body
        body.user = req.user.id
        const { data } = await axios.post('/book-slot', body)
        if (data) return res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error !" })
    }
}

export const userBookings = async (req, res) => {
    try {
        const { data } = await axios.get('/user-bookings', { params: { user: req.user.id } })
        if (data) return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error !" })
    }
}

export const createPaymentIntent = async (req, res) => {
    try {
        const { email } = await usermodel.findOne({ _id: req.user.id }, { email: 1 })
        const { data } = await axios.get('/payment', { params: { book_id: req.query.book_id, email } })
        if (data) return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error !" })
    }
}

export const bookingSuccess = async (req, res) => {
    try {
        const { email, username } = await usermodel.findOne({ _id: req.user.id }, { email: 1, username: 1 })
        const { data } = await axios.put('/booking-success', { id: req.body.id, email, username })
        if (data) return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error !" })
    }
}

export const bookingFailed = async (req, res) => {
    try {
        const { data } = await axios.put('/booking-failed', { id: req.body.id })
        if (data) return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error !" })
    }
}
