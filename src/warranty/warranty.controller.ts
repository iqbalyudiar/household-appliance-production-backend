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
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
@ApiTags('Warranties')
@Controller('warranty')
export class WarrantyController {
  constructor(private warrantyService: WarrantyService) {}

  @Post('claim')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a warranty claim' })
  createClaim(@Body() createDto: CreateWarrantyClaimDto, @Request() req) {
    return this.warrantyService.createClaim(req.user.id, createDto);
  }

  @Get('claims/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'View your warranty claims' })
  findMyClaims(@Request() req) {
    return this.warrantyService.findClaimsByUser(req.user.id);
  }

  @Get('claims/all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('staff')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'View all warranty claims (Staff only)' })
  findAllClaims() {
    return this.warrantyService.findAllClaims();
  }

  @Post('claims/:id/status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('staff')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update warranty claim status (Staff only)' })
  updateClaimStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateWarrantyClaimDto,
  ) {
    return this.warrantyService.updateClaimStatus(id, updateDto);
  }
}
