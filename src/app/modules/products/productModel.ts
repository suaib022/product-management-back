import { Schema, model } from 'mongoose';
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from './productInterface';

const VariantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<TProduct, ProductModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
});

productSchema.statics.doesProductExist = async function (name: string) {
  const existingProduct = await Product.findOne({ name });
  return existingProduct;
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);
