import express from 'express';
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getToProducts } from '../controller/product.js'
import { validateToken, admin } from '../middleware/auth_middleware.js'

const router = express.Router();

router.get('/', getProducts)
router.get('/top', getToProducts)
router.get('/:id', getProductById)
router.post('/:id/reviews', validateToken, createProductReview)

// Admin routes 
router.post('/', validateToken, admin, createProduct)
router.put('/:id', validateToken, admin, updateProduct)
router.delete('/:id', validateToken, admin, deleteProduct)

export default router;

