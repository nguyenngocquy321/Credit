import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly packageServices: Repository<Package>,
  ) {}
  async getPakage() {
    const data = await this.packageServices.find();
    if (data.length === 0) {
      throw new NotFoundException('Hiện tại chưa có gói nào được tìm thấy');
    }
    return data;
  }
  async addPakage(createPackageDto: CreatePackageDto): Promise<Package> {
    const [existingPackage] = await Promise.all([
      this.packageServices.findOne({ where: { name: createPackageDto.name } }),
    ]);
    if (existingPackage) {
      throw new NotFoundException('Gói dịch vụ đã tồn tại');
    }
    const newPackage = this.packageServices.create(createPackageDto);
    return await this.packageServices.save(newPackage);
  }
}
