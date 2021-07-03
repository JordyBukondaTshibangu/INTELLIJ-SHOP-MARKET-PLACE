import express from 'express'
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from '../controller/order.js'
import { admin, validateToken } from '../middleware/auth_middleware.js'
const router = express.Router()

router.post('/', validateToken, addOrderItems);
router.get('/myorders', validateToken, getMyOrders);
router.get('/:id', validateToken, getOrderById);
router.put('/:id/pay', validateToken, updateOrderToPaid);
router.put('/:id/deliver', validateToken, admin, updateOrderToDelivered);

// Admin routes 

router.get('/', validateToken, admin, getOrders)

export default router

