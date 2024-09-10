import { Document, ObjectId } from 'mongoose';
import { Product } from '../schemas/product.schema';

export interface IProduct extends Document {
  id: ObjectId;
  name: string;
  description: string;
  price: number;
}

export interface ISuccess {
  success: boolean;
}

export interface IMessage {
  message: string;
}

export interface IProductsResponse {
  success: boolean;
  products: Product[];
  total: number;
}

export interface ID {
  id: ObjectId | string | unknown;
}

export type IProductResponse = ISuccess & ID & Product;

export type IProductCreateResponse = IProductResponse & IMessage;

export type IProductDeleteResponse = ISuccess & IMessage;
