import express from 'express';
import { ProductController } from './productController';

const router = express.Router();

router.post('/', ProductController.createProduct);

router.get('/', ProductController.getAllProducts);

router.get('/:productId', ProductController.getSingleProduct);

router.delete('/:productId', ProductController.deleteSingleProduct);

router.put('/:productId', ProductController.updateSingleProduct);

export const ProductRoutes = router;
