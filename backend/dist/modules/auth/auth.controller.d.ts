import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly jwtService;
    constructor(authService: AuthService, userService: UsersService, jwtService: JwtService);
    register(userData: CreateUserDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken({ refreshToken }: {
        refreshToken: string;
    }): Promise<{
        access_token: string;
    }>;
    profile(req: any): any;
    logout({ token }: {
        token: string;
    }): Promise<void>;
}
