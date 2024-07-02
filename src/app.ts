import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/productRoute';
import { orderRoutes } from './app/modules/orders/orderRoute';
import notFound from './app/Route/notFound';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', orderRoutes);

const test = (req: Request, res: Response) => {
  res.send('Welcome to the home page !');
};

app.get('/', test);

// Error Handling
app.use(notFound);

export default app;
