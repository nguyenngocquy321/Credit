import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenEntity } from '../auth/entities/refresh_tokens';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {}
  async createUser(userData: CreateUserDto): Promise<User> {
    // 1. Kiểm tra tồn tại
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new ConflictException('Email này đã được sử dụng');
    }
    if (!userData.password) {
      throw new BadRequestException('Mật khẩu là bắt buộc');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('Email không tồn tại');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }
    return user;
  }
  async saveRefreshToken(
    userId: number,
    refreshToken: string,
    expiresAt: Date,
  ) {
    const tokenRecord = this.refreshTokenRepository.create({
      token_hash: refreshToken,
      expires_at: expiresAt,
      user: { id: userId },
    });
    const hashedRefToken = await bcrypt.hash(refreshToken, 10);
    tokenRecord.token_hash = hashedRefToken;
    return await this.refreshTokenRepository.save(tokenRecord);
  }
  async verifyRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<boolean> {
    const refToken = await this.refreshTokenRepository.findOne({
      where: { user: { id: userId } },
    });

    // 2. Kiểm tra nếu không tìm thấy token hoặc token đã bị thu hồi (is_revoked)
    if (!refToken || refToken.is_revoked) {
      return false;
    }
    const isMatch = await bcrypt.compare(refreshToken, refToken.token_hash);

    return isMatch;
  }
}
