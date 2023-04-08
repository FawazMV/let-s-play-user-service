import express from 'express';
import authVeify from '../Helpers/JWT.js'
import { userDetails, updateProfile } from '../Controllers/ProfileControllers.js'


const router = express.Router()


router.get('/user-details', authVeify, userDetails)

router.put('/update', authVeify, updateProfile)



export default router  