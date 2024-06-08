import { z } from 'zod';

const OrderValidationSchema = z.object({
  email: z.string().email().nonempty('Email is required'),
  productId: z.string().nonempty('productId is required'),
  price: z.number().positive('Price must be a positive number'),
  quantity: z.number().positive('Quantity must be a positive number'),
});

export default OrderValidationSchema;
