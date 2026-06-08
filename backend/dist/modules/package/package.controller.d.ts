import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
export declare class PackageController {
    private readonly packageService;
    constructor(packageService: PackageService);
    getPackages(): Promise<import("./entities/package.entity").Package[]>;
    createPackage(createPackageDto: CreatePackageDto): Promise<import("./entities/package.entity").Package>;
}
