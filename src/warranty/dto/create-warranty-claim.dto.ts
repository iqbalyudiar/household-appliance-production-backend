import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateWarrantyClaimDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;
}
