import { TProduct } from './productInterface';
import { Product } from './productModel';

const createProductIntoDB = async (productData: TProduct) => {
  const existingProduct = await Product.doesProductExist(productData.name);
  //checking if the product exists before in productDB(if it does, it will simply increase the quantity in inventory)
  if (existingProduct) {
    existingProduct.inventory.quantity += productData.inventory.quantity;
    await existingProduct.save();
    if (existingProduct.inventory.quantity > 0) {
      //updating stock condition of the product
      existingProduct.inventory.inStock = true;
      await existingProduct.save();
    }
    return existingProduct;
  } else {
    const result = await Product.create(productData);
    return result;
  }
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await Product.findOne({ _id });
  return result;
};

const deleteSingleProductFromDB = async (_id: string) => {
  const result = await Product.deleteOne({ _id });
  return result;
};

const updateProductInDB = async (_id: string, updatedData: object) => {
  const existingProduct = await Product.findOne({
    _id: _id,
  });
  //checking if the product exists in productDB
  if (!existingProduct) {
    throw new Error('Product Not Found!');
  } else {
    const result = await Product.updateOne({ _id }, { $set: updatedData });
    return result;
  }
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
  updateProductInDB,
};
