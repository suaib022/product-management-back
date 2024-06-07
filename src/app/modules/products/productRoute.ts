import express from 'express';
import { ProductController } from './productController';

const router = express.Router();

router.post('/create-product', ProductController.createProduct);

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getSingleProduct);

router.delete('/delete/:id', ProductController.deleteSingleProduct);

router.put('/updateOne/:id', ProductController.updateSingleProduct);

export const ProductRoutes = router;
