import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWarrantyClaimDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  productId: string;
}
