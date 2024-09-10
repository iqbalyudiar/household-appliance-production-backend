import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document, Types} from 'mongoose'
import { Product } from 'src/products/schemas/product.schema'
import { User } from 'src/users/schemas/user.schema'

export type WarrantyStatus = 'pending' | 'approved' | 'rejected';

@Schema()
export class Warranty extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Product' })
    product: Product;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: User;

    @Prop()
    issueDate: Date;

    @Prop()
    expiryDate: Date;

    @Prop({ default: false })
    isClaimed: boolean;

    @Prop({ default: 'pending' })
    status: WarrantyStatus;
}

export const WarrantySchema = SchemaFactory.createForClass(Warranty);