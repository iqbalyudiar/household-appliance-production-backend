import { IsEnum } from 'class-validator';
import { WarrantyStatus } from '../schema/warranty.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWarrantyClaimDto {
  @ApiProperty()
  @IsEnum(['approved', 'rejected'])
  status: WarrantyStatus;
}
