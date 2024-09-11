import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async createClaim(userId: string, createDto: CreateWarrantyClaimDto) {
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

    const claim = await newClaim.save();
    return {
      success: true,
      _id: claim._id,
      product: claim.product,
      user: claim.user,
      issueDate: claim.issueDate,
      expiryDate: claim.expiryDate,
      isClaimed: claim.isClaimed,
      status: claim.status,
      message: 'Successfully create a claim',
    };
  }

  async findClaimsByUser(userId: string) {
    const warranty = await this.warrantyModel
      .find({ user: userId })
      .populate('product', 'name description price')
      .populate('user', 'name email')
      .exec();
    return {
      success: true,
      claims: warranty,
    };
  }

  async findAllClaims() {
    const warranties = await this.warrantyModel
      .find()
      .populate('product', 'name description price')
      .populate('user', 'name email');
    const total = await this.warrantyModel.countDocuments().exec();
    return {
      success: true,
      claims: warranties,
      total,
    };
  }

  async updateClaimStatus(claimId: string, updateDto: UpdateWarrantyClaimDto) {
    const claim = await this.warrantyModel.findByIdAndUpdate(
      claimId,
      { status: updateDto.status },
      { new: true },
    );
    if (!claim) {
      throw new HttpException(
        {
          success: false,
          message: `Warranty claim with ID ${claimId} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      success: true,
      message: `Successfully update status claim with ID  ${claimId} to ${updateDto.status}`,
    };
  }
}
