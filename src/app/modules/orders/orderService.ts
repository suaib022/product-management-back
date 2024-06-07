import { TOrder } from './orderInterface';
import { Order } from './orderModel';

const createOrderIntoDB = async (orderedProduct: TOrder) => {
  const result = Order.create(orderedProduct);
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = Order.find();
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
