import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Warranty } from './schema/warranty.schema';
import { CreateWarrantyClaimDto } from './dto/create-warranty-claim.dto';
import { UpdateWarrantyClaimDto } from './dto/update-warranty-claim.dto';
@Injectable()
export class WarrantyService {
  constructor(
    @InjectModel(Warranty.name) private warrantyModel: Model<Warranty>,
  ) {}

  async createClaim(
    userId: string,
    createDto: CreateWarrantyClaimDto,
  ): Promise<Warranty> {
    const newClaim = new this.warrantyModel({
      product: createDto.productId,
      user: userId,
      issueDate: new Date(),
      expiryDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1),
      ),
      isClaimed: true,
      status: 'pending',
    });
    return newClaim.save();
  }

  async findClaimsByUser(userId: string): Promise<Warranty[]> {
    const warranty = await this.warrantyModel
      .find({ user: userId })
      .populate('product', 'name description price')
      .populate('user', 'name email')
      .exec();
    return warranty;
  }

  async findAllClaims(): Promise<Warranty[]> {
    const warranties = await this.warrantyModel
      .find()
      .populate('product', 'name description price')
      .populate('user', 'name email');
    return warranties;
  }
}
