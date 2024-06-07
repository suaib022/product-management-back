import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/productRoute';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/products', ProductRoutes);

export default app;
