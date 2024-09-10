import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/common/guards/roles.guard';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
    ]),
  ],
  providers: [ProductsService, JwtStrategy, RolesGuard, Reflector],
  controllers: [ProductsController],
})
export class ProductsModule {}
