import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import connectDB from './Models/config.js'

import authRoutes from './Routes/authRoutes.js'
import requestRoutes from './Routes/requestRoutes.js'
import profileRoutes from './Routes/profileRoutes.js'
import bookingRoutes from './Routes/bookingRoutes.js'
import otherRoutes from './Routes/otherRoutes.js'

dotenv.config()
const app = express()
app.use(express.json(),cors());

app.use('/', authRoutes)

app.use('/req-user', requestRoutes)

app.use('/profile', profileRoutes)

app.use('/book', bookingRoutes)

app.use('/user', otherRoutes)


app.use((err, req, res, next) => {
    if (err.code === 11000) {
        return res.status(500).json({ error: 'Duplicate found' })
    } else if (err.name === "ValidationError") {
        return res.status(500).json({ error: err.message })
    }
    else return res.status(500).json({ error: "Internal server error", err: err })

})

connectDB()
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(7777, () => {
        console.log(`Server running on port 7777 -user service`);
    });
});