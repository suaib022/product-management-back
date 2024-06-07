import { Request, Response } from 'express';
import { ProductServices } from './productService';
import ProductValidationSchema from './productValidation';
import { Product } from './productModel';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { productData } = req.body;

    //zod validation
    const zodParsedData = ProductValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product Added Successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let result;
    if (searchTerm) {
      result = await Product.find({
        $or: [
          { name: new RegExp(searchTerm as string, 'i') },
          { description: new RegExp(searchTerm as string, 'i') },
          { category: new RegExp(searchTerm as string, 'i') },
          { tags: new RegExp(searchTerm as string, 'i') },
        ],
      });
    } else {
      result = await ProductServices.getAllProductsFromDB();
    }

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: `Product with id ${productId} retrieved successfully!`,
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const result = await ProductServices.deleteSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: `Product with id ${productId} deleted successfully!`,
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const { updatedData } = req.body;
    const result = await ProductServices.updateProductInDB(
      productId,
      updatedData,
    );

    res.status(200).json({
      success: true,
      message: `product with id ${productId} has been updated successfully`,
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
