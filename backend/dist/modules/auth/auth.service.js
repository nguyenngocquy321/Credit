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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const refresh_tokens_1 = require("./entities/refresh_tokens");
const typeorm_2 = require("typeorm");
const redis_service_1 = require("../redis/redis.service");
let AuthService = class AuthService {
    userService;
    jwtService;
    refRepo;
    redisRepo;
    constructor(userService, jwtService, refRepo, redisRepo) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.refRepo = refRepo;
        this.redisRepo = redisRepo;
    }
    async login(user) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
            total_credits: user.total_credits,
            isDeleted: user.isDeleted,
            isBanned: user.isBanned,
        };
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
        await this.userService.saveRefreshToken(user.id, refresh_token, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '30s' }),
            refresh_token: refresh_token,
        };
    }
    async verifyRefreshToken(refreshToken, userId) {
        const decoded = this.jwtService.decode(refreshToken);
        if (decoded) {
            return this.userService.verifyRefreshToken(refreshToken, userId);
        }
        return false;
    }
    async generateNewAccessToken(email) {
        const user = await this.userService.findByEmail(email);
        if (!user || user.isBanned || user.isDeleted) {
            throw new common_1.UnauthorizedException('Tài khoản không hợp lệ hoặc đã bị khóa.');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            total_credits: user.total_credits,
            isDeleted: user.isDeleted,
            isBanned: user.isBanned,
        };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '30s' }),
        };
    }
    async logout(token, id) {
        const decoded = this.jwtService.decode(token);
        const expiredAt = decoded.exp;
        const now = Math.floor(Date.now() / 1000);
        const remainingTime = expiredAt - now;
        this.refRepo.delete({ id });
        if (remainingTime > 0) {
            await this.redisRepo.addToBlacklist(token, remainingTime);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(refresh_tokens_1.RefreshTokenEntity)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        typeorm_2.Repository,
        redis_service_1.RedisService])
], AuthService);
//# sourceMappingURL=auth.service.js.map