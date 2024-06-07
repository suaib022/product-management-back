import { TProduct } from './productInterface';
import { Product } from './productModel';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.doesProductExist(productData?.name)) {
    throw new Error('Item already exists!');
  }

  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await Product.findOne({ _id });
  return result;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
};
