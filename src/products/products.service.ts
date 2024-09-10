import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { IProduct } from './interface/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }
}
