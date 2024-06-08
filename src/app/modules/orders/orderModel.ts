import { Schema, model } from 'mongoose';
import { OrderModel, TOrder } from './orderInterface';

const orderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

orderSchema.statics.doesOrderExist = async function (productId: string) {
  const existingOrder = await Order.findOne({ productId });
  return existingOrder;
};

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
