import express from 'express';
import { bookSlot, userBookings, createPaymentIntent, bookingSuccess, bookingFailed } from '../Controllers/bookingControllers.js';
import authVeify from '../Helpers/JWT.js';

const router = express.Router()


router.post('/slot', authVeify, bookSlot)

router.get('/details', authVeify, userBookings)

router.get('/payment', authVeify, createPaymentIntent)

router.put('/booking-success', authVeify, bookingSuccess)

router.put('/booking-failed', bookingFailed)

export default router     