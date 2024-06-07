import express from 'express';
import { ProductController } from './productController';

const router = express.Router();

router.post('/create-product', ProductController.createProduct);

export const ProductRoutes = router;
