import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { IProduct } from './interface/product.interface';
@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }
}
