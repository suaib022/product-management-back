import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/productRoute';
import { orderRoutes } from './app/modules/orders/orderRoute';
import rootRoute from './app/Route/rootRoute';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', orderRoutes);

app.use('/', rootRoute);

// Error Handling
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found!',
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error!',
  });
});

export default app;
