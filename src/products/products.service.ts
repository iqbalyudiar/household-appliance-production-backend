import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { IProduct } from './interface/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new HttpException(
        {
          success: false,
          message: `Product with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new HttpException(
        {
          success: false,
          message: `Product with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return updatedProduct;
  }

  async delete(id: string) {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpException(
        {
          success: false,
          message: `Product with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      success: true,
      message: `Product with ID ${id} successfully deleted`,
    };
  }
}
