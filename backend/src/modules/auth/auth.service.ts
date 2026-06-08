import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './entities/refresh_tokens';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshTokenEntity)
    private readonly refRepo: Repository<RefreshTokenEntity>,
    private readonly redisRepo: RedisService,
  ) {}
  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      total_credits: user.total_credits,
      isDeleted: user.isDeleted,
      isBanned: user.isBanned,
    };
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.userService.saveRefreshToken(
      user.id,
      refresh_token,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '30s' }),
      refresh_token: refresh_token,
    };
  }
  async verifyRefreshToken(refreshToken: string, userId: number) {
    const decoded = this.jwtService.decode(refreshToken);
    if (decoded) {
      return this.userService.verifyRefreshToken(refreshToken, userId);
    }
    return false;
  }

  async generateNewAccessToken(email: string) {
    const user = await this.userService.findByEmail(email);

    // 2. Kiểm tra user tồn tại và không bị khóa
    if (!user || user.isBanned || user.isDeleted) {
      throw new UnauthorizedException(
        'Tài khoản không hợp lệ hoặc đã bị khóa.',
      );
    }
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      total_credits: user.total_credits,
      isDeleted: user.isDeleted,
      isBanned: user.isBanned,
    };

    // 4. Trả về access token mới
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '30s' }),
    };
  }
  async logout(token: string, id: number) {
    const decoded = this.jwtService.decode(token) as any;
    const expiredAt = decoded.exp;
    const now = Math.floor(Date.now() / 1000);
    const remainingTime = expiredAt - now;
    this.refRepo.delete({ id });
    if (remainingTime > 0) {
      await this.redisRepo.addToBlacklist(token, remainingTime);
    }
  }
}
