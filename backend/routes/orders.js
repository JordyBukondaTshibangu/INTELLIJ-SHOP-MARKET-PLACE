import express from 'express'
import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid } from '../controller/order.js'
import { validateToken } from '../middleware/auth_middleware.js'
const router = express.Router()

router.post('/', validateToken, addOrderItems);
router.get('/myorders', validateToken, getMyOrders);
router.get('/:id', validateToken, getOrderById);
router.put('/:id/pay', validateToken, updateOrderToPaid);

export default router

