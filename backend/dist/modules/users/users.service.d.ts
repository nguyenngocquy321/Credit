import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenEntity } from '../auth/entities/refresh_tokens';
export declare class UsersService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly refreshTokenRepository;
    constructor(userRepository: Repository<User>, jwtService: JwtService, refreshTokenRepository: Repository<RefreshTokenEntity>);
    createUser(userData: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    validateUser(email: string, password: string): Promise<User>;
    saveRefreshToken(userId: number, refreshToken: string, expiresAt: Date): Promise<RefreshTokenEntity>;
    verifyRefreshToken(refreshToken: string, userId: number): Promise<boolean>;
}
