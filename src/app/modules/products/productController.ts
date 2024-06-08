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
      message: 'Product created Successfully!',
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
    //checking if searchTerm exists
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
      message: searchTerm
        ? `Products matching search term ${searchTerm} fetched successfully!`
        : 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Products Not Found!',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: `Product with id ${productId} fetched successfully!`,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Product Not Found!',
      error: err,
    });
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
    res.status(200).json({
      success: false,
      message: 'Something Went Wrong!',
      error: err,
    });
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
      data: [result, updatedData],
    });
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: err.message || 'Something Went Wrong!',
      error: err,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
