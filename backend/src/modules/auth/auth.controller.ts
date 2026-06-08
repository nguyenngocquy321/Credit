import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guards';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() userData: CreateUserDto) {
    const newUser = await this.userService.createUser(userData);
    return this.authService.login(newUser);
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required.');
    }

    try {
      const payload = this.jwtService.verify(refreshToken);
      const userId = payload.sub;
      const isValid = await this.authService.verifyRefreshToken(
        refreshToken,
        userId,
      );

      if (!isValid) {
        throw new UnauthorizedException(
          'Refresh token không hợp lệ hoặc đã bị thu hồi.',
        );
      }

      return await this.authService.generateNewAccessToken(payload.email);
    } catch (err) {
      throw new UnauthorizedException('Token đã hết hạn hoặc không hợp lệ.');
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Request() req: any) {
    return req.user;
  }
  @Post('/logout')
  async logout(@Body() { token }: { token: string }) {
    const decoded = this.jwtService.decode(token) as any;
    const userId = decoded.sub;
    await this.authService.logout(token, userId);
  }
}
