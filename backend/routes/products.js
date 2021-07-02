import express from 'express';
import { getProducts, getProductById, deleteProduct } from '../controller/product.js'
import { validateToken, admin } from '../middleware/auth_middleware.js'

const router = express.Router();

router.get('/', getProducts)
router.get('/:id', getProductById)

// Admin routes 
router.delete('/:id', validateToken, admin, deleteProduct)

export default router;

