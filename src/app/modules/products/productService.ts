import { Product } from './productInterface';
import { ProductModel } from './productModel';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
};
