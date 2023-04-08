import express from "express";
import { reviewSubmit } from "../Controllers/otherControllers.js";
import authVeify from "../Helpers/JWT.js";
const router = express.Router()


router.post('/review-submit', authVeify, reviewSubmit)

export default router