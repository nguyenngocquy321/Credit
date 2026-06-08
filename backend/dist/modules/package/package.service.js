"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageService = void 0;
const common_1 = require("@nestjs/common");
const package_entity_1 = require("./entities/package.entity");
const typeorm_1 = require("typeorm");
const typeorm_decorators_1 = require("@nestjs/typeorm/dist/common/typeorm.decorators");
let PackageService = class PackageService {
    packageServices;
    constructor(packageServices) {
        this.packageServices = packageServices;
    }
    async getPakage() {
        const data = await this.packageServices.find();
        if (data.length === 0) {
            throw new common_1.NotFoundException('Hiện tại chưa có gói nào được tìm thấy');
        }
        return data;
    }
    async addPakage(createPackageDto) {
        const [existingPackage] = await Promise.all([
            this.packageServices.findOne({ where: { name: createPackageDto.name } }),
        ]);
        if (existingPackage) {
            throw new common_1.NotFoundException('Gói dịch vụ đã tồn tại');
        }
        const newPackage = this.packageServices.create(createPackageDto);
        return await this.packageServices.save(newPackage);
    }
};
exports.PackageService = PackageService;
exports.PackageService = PackageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_decorators_1.InjectRepository)(package_entity_1.Package)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PackageService);
//# sourceMappingURL=package.service.js.map