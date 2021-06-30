import express from 'express';
import { register, login, getUserProfile, updateUserProfile, getAllUsers } from '../controller/user.js'
import { validateToken, admin } from '../middleware/auth_middleware.js'

const router = express.Router();

router.post('/login', login )
router.post('/', register)
router.get('/profile', validateToken, getUserProfile)
router.put('/profile', validateToken, updateUserProfile)

/* ADMIN ROUTES */

router.get('/', validateToken, admin , getAllUsers)

export default router;

