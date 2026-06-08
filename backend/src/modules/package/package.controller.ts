import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { RolesGuard } from 'src/guards/role-auth.guard';
@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}
  @Get()
  async getPackages() {
    return await this.packageService.getPakage();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/insertPackage')
  async createPackage(@Body() createPackageDto: CreatePackageDto) {
    return await this.packageService.addPakage(createPackageDto);
  }
}
