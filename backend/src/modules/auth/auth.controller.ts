import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/dataLogin';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('/register')
  register(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }
  @Post('/login')
  async login(@Body() dataLogin: LoginDto) {
    const { email = '', password = '' } = dataLogin;
    return this.userService.validateUser(email, password);
  }
}
