import { TOrder } from './orderInterface';
import { Order } from './orderModel';

const createOrderIntoDB = async (orderedProduct: TOrder) => {
  // console.log('new:', orderedProduct.quantity);
  // const n = await Order.doesOrderExist(orderedProduct?.productId);
  // console.log('m', n);

  if (await Order.doesOrderExist) {
    const existingOrder = await Order.findOne({
      productId: orderedProduct.productId,
      email: orderedProduct.email,
    });
    if (existingOrder) {
      existingOrder.quantity += orderedProduct.quantity;
      await existingOrder.save();
      return existingOrder;
    }
  } else {
    const result = Order.create(orderedProduct);
    return result;
  }
};

const getAllOrdersFromDB = async () => {
  const result = Order.find();
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
