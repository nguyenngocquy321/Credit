import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/dataLogin';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    register(userData: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    login(dataLogin: LoginDto): Promise<import("../users/entities/user.entity").User>;
}
