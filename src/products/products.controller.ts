import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('staff')
    getAllProducts(){
        return this.productService.findAll()
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('staff')
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }
}

