import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    price?: number;
}
