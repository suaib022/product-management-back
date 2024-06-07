import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/productRoute';
import { orderRoutes } from './app/modules/orders/orderRoute';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/products', ProductRoutes);

app.use('/api/orders', orderRoutes);

export default app;
