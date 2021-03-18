import express from 'express';
import { register, login, getUserProfile, updateUserProfile } from '../controller/user.js'
import { validateToken } from '../middleware/auth_middleware.js'

const router = express.Router();

router.post('/login', login )
router.post('/', register)
router.get('/profile', validateToken, getUserProfile)
router.put('/profile', validateToken, updateUserProfile)

export default router;

