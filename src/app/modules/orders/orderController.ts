import { Request, Response } from 'express';
import { orderServices } from './orderService';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { orderedProduct } = req.body;
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

export const orderController = {
  createOrder,
};
