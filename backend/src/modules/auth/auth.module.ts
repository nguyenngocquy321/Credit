import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../passports/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../passports/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './entities/refresh_tokens';
import { RedisService } from '../redis/redis.service';
@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RedisService],
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity]),

    ConfigModule.forRoot({ envFilePath: '../.env' }),
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30s' },
    }),
  ],
  exports: [TypeOrmModule],
})
export class AuthModule {}
