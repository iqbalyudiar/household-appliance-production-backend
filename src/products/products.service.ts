import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  IProduct,
  IProductsResponse,
  IProductResponse,
  IProductCreateResponse,
  IProductDeleteResponse,
} from './interface/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  async findAll(): Promise<IProductsResponse> {
    const products = await this.productModel.find().exec();
    const total = await this.productModel.countDocuments().exec();
    return {
      success: true,
      products,
      total,
    };
  }

  async findOne(id: string): Promise<IProductResponse> {
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
    return {
      success: true,
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }

  async create(
    createProductDto: CreateProductDto,
  ): Promise<IProductCreateResponse> {
    const newProduct = new this.productModel(createProductDto);
    const product = await newProduct.save();
    return {
      success: true,
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      message: 'Successfully create product',
    };
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProductCreateResponse> {
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
    return {
      success: true,
      id: updatedProduct._id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      message: 'Successfully update product',
    };
  }

  async delete(id: string): Promise<IProductDeleteResponse> {
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
