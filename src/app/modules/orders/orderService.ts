import { Product } from '../products/productModel';
import { TOrder } from './orderInterface';
import { Order } from './orderModel';

const createOrderIntoDB = async (orderedProduct: TOrder) => {
  //check if the ordered product is present in orderDB before
  const existingOrder = await Order.findOne({
    productId: orderedProduct.productId,
    email: orderedProduct.email,
  });
  //check if the product for requested order exists in productsDB
  const existingOrderedProduct = await Product.findOne({
    _id: orderedProduct.productId,
  });
  //will throw error if the product's id does not exist
  if (!existingOrderedProduct?._id) {
    throw new Error('Product Not Found');
  }
  //function if the product is already in orderDB(it will just increase the quantity)
  if (existingOrder) {
    //checking if the requested quantity is available in stock in productDB
    if (existingOrderedProduct?.inventory.quantity < orderedProduct.quantity) {
      throw new Error('Insufficient quantity available in inventory');
    } else {
      //increasing orders quantity and saving into orderDB
      existingOrder.quantity += orderedProduct.quantity;
      await existingOrder.save();
      //decreasing products quantity and saving into productDB
      existingOrderedProduct?.inventory?.quantity -= orderedProduct.quantity;
      await existingOrderedProduct?.save();
      //checking if the product gets out of stock after ordering
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
