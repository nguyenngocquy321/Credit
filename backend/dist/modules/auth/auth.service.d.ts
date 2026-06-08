import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenEntity } from './entities/refresh_tokens';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly refRepo;
    private readonly redisRepo;
    constructor(userService: UsersService, jwtService: JwtService, refRepo: Repository<RefreshTokenEntity>, redisRepo: RedisService);
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    verifyRefreshToken(refreshToken: string, userId: number): Promise<boolean>;
    generateNewAccessToken(email: string): Promise<{
        access_token: string;
    }>;
    logout(token: string, id: number): Promise<void>;
}
