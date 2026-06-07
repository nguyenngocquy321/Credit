import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    register(userData: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    login(dataLogin: any): Promise<import("../users/entities/user.entity").User>;
}
