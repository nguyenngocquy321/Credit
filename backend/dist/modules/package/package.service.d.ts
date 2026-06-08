import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';
export declare class PackageService {
    private readonly packageServices;
    constructor(packageServices: Repository<Package>);
    getPakage(): Promise<Package[]>;
    addPakage(createPackageDto: CreatePackageDto): Promise<Package>;
}
