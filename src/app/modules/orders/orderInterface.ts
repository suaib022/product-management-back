import { Model } from "mongoose";

export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export interface OrderModel extends Model<TOrder>{
  doesOrderExist(productId: string): Promise<TOrder | null>
}


/***
 * export interface ProductModel extends Model<TProduct> {
  doesProductExist(name: string): Promise<TProduct | null>;
}
 * /