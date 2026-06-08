// src/modules/auth/strategies/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt'; // Phải import cả hai từ 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly redisService: RedisService) {
    super({
      // Lấy token từ Header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY_CUA_BAN',
      passReqToCallback: true,
    });
  }

  // Hàm này chạy sau khi token được giải mã thành công
  async validate(req: any, payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!token) {
      throw new UnauthorizedException('Token không tồn tại');
    }
    const isBlacklisted = await this.redisService.isBlacklisted(token);

    if (isBlacklisted) {
      throw new UnauthorizedException('Token đã bị thu hồi');
    }
    return {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      total_credits: payload.total_credits,
      isDeleted: payload.isDeleted,
      isBanned: payload.isBanned,
    };
  }
}
