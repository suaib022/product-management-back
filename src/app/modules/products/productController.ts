import { Request, Response } from 'express';
import { ProductServices } from './productService';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    const result = await ProductServices.createProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: 'Product Added Successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ProductController = {
  createProduct,
};
