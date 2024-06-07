import { TOrder } from './orderInterface';
import { OrderModel } from './orderModel';

const createOrderIntoDB = async (orderedProduct: TOrder) => {
  const result = OrderModel.create(orderedProduct);
  return result;
};

export const orderServices = {
  createOrderIntoDB,
};
