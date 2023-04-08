import express from 'express';
import { getUsers, getUsersCount } from '../Controllers/requestControllers.js';

const router = express.Router()


router.get('/get-users', getUsers)

router.get('/get-user-count', getUsersCount)

export default router  