import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WarrantyController } from './warranty.controller';
import { WarrantyService } from './warranty.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WarrantySchema } from './schema/warranty.schema';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/common/guards/roles.guard';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Warranty',
        schema: WarrantySchema,
      },
    ]),
  ],
  controllers: [WarrantyController],
  providers: [WarrantyService, JwtStrategy, RolesGuard, Reflector],
})
export class WarrantyModule {}
