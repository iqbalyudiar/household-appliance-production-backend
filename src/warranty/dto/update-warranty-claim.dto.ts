import { IsEnum } from 'class-validator';
import { WarrantyStatus } from '../schema/warranty.schema';

export class UpdateWarrantyClaimDto {
    @IsEnum(['approved', 'rejected'])
    status: WarrantyStatus;
}