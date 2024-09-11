import {
  Controller,
  Post,
  Get,
  Request,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { CreateWarrantyClaimDto } from './dto/create-warranty-claim.dto';
import { UpdateWarrantyClaimDto } from './dto/update-warranty-claim.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
@Controller('warranty')
export class WarrantyController {
  constructor(private warrantyService: WarrantyService) {}

  @Post('claim')
  @UseGuards(AuthGuard('jwt'))
  createClaim(@Body() createDto: CreateWarrantyClaimDto, @Request() req) {
    return this.warrantyService.createClaim(req.user.id, createDto);
  }

  @Get('claims/me')
  @UseGuards(AuthGuard('jwt'))
  findMyClaims(@Request() req) {
    return this.warrantyService.findClaimsByUser(req.user.id);
  }

  @Get('claims/all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('staff')
  findAllClaims() {
    return this.warrantyService.findAllClaims();
  }

  @Post('claims/:id/status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('staff')
  updateClaimStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateWarrantyClaimDto,
  ) {
    return this.warrantyService.updateClaimStatus(id, updateDto);
  }
}
