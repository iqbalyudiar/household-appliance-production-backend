import { Controller, Post, Request, Body, UseGuards } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { CreateWarrantyClaimDto } from './dto/create-warranty-claim.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('warranty')
export class WarrantyController {
  constructor(private warrantyService: WarrantyService) {}

  @Post('claim')
  @UseGuards(AuthGuard('jwt'))
  createClaim(@Body() createDto: CreateWarrantyClaimDto, @Request() req) {
    return this.warrantyService.createClaim(req.user.id, createDto);
  }
}
