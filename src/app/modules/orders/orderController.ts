import { Request, Response } from 'express';
import { orderServices } from './orderService';
import { Order } from './orderModel';
import OrderValidationSchema from './orderValidation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { orderedProduct } = req.body;
    //orderData validation using zod
    const zodParsedData = OrderValidationSchema.parse(orderedProduct);

    const result = await orderServices.createOrderIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong!',
      error: err,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    //searchTerm for orderDB
    const { email } = req.query;
    let result;
    //procedure if searchTerm exists
    if (email) {
      result = await Order.find({
        $or: [{ email: new RegExp(email as string, 'i') }],
      });
    } else {
      result = await orderServices.getAllOrdersFromDB();
    }

    res.status(200).json({
      success: true,
      message: email
        ? `Orders fetched successfully for user email : ${email}`
        : 'orders fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Order not found!',
      error: err,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
};
