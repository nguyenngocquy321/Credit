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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const local_auth_guards_1 = require("../../guards/local-auth.guards");
const jwt_auth_guards_1 = require("../../guards/jwt-auth.guards");
const jwt_1 = require("@nestjs/jwt");
let AuthController = class AuthController {
    authService;
    userService;
    jwtService;
    constructor(authService, userService, jwtService) {
        this.authService = authService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(userData) {
        const newUser = await this.userService.createUser(userData);
        return this.authService.login(newUser);
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    async refreshToken({ refreshToken }) {
        if (!refreshToken) {
            throw new common_1.BadRequestException('Refresh token is required.');
        }
        try {
            const payload = this.jwtService.verify(refreshToken);
            const userId = payload.sub;
            const isValid = await this.authService.verifyRefreshToken(refreshToken, userId);
            if (!isValid) {
                throw new common_1.UnauthorizedException('Refresh token không hợp lệ hoặc đã bị thu hồi.');
            }
            return await this.authService.generateNewAccessToken(payload.email);
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Token đã hết hạn hoặc không hợp lệ.');
        }
    }
    profile(req) {
        return req.user;
    }
    async logout({ token }) {
        const decoded = this.jwtService.decode(token);
        const userId = decoded.sub;
        await this.authService.logout(token, userId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guards_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuard),
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "profile", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map