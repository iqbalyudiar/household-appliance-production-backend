import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
