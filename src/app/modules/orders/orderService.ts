import { Product } from '../products/productModel';
import { TOrder } from './orderInterface';
import { Order } from './orderModel';

const createOrderIntoDB = async (orderedProduct: TOrder) => {
  const existingOrder = await Order.findOne({
    productId: orderedProduct.productId,
    email: orderedProduct.email,
  });
  const existingOrderedProduct = await Product.findOne({
    _id: orderedProduct.productId,
  });
  if (existingOrder) {
    if (existingOrderedProduct?.inventory.quantity < orderedProduct.quantity) {
      throw new Error('Insufficient amount in stock!');
    } else {
      existingOrder.quantity += orderedProduct.quantity;
      await existingOrder.save();
      existingOrderedProduct?.inventory?.quantity -= orderedProduct.quantity;
      await existingOrderedProduct?.save();
      if (existingOrderedProduct?.inventory?.quantity <= 0) {
        existingOrderedProduct?.inventory?.inStock = false;
        await existingOrderedProduct?.save();
      }
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
