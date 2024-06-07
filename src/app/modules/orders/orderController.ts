import { Request, Response } from 'express';
import { orderServices } from './orderService';
import { Order } from './orderModel';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { orderedProduct } = req.body;
    // console.log(orderedProduct.quantity);

    const result = await orderServices.createOrderIntoDB(orderedProduct);

    res.status(200).json({
      success: true,
      message: 'Item ordered successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    let result;
    if (email) {
      result = await Order.find({
        $or: [{ email: new RegExp(email as string, 'i') }],
      });
    } else {
      result = await orderServices.getAllOrdersFromDB();
    }

    res.status(200).json({
      success: true,
      message: 'orders retrieved successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
};
