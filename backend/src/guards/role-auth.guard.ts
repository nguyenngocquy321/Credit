import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    // 1. Kiểm tra xem đã đăng nhập chưa (JwtAuthGuard đã gắn user vào request)
    if (!user) {
      throw new UnauthorizedException(
        'Bạn cần đăng nhập để thực hiện hành động này',
      );
    }

    // 2. Kiểm tra quyền
    const hasRole = requiredRoles.some((role) => user.roles?.includes(role));
    if (!hasRole) {
      throw new ForbiddenException(
        'Bạn không có quyền thực hiện hành động này',
      );
    }

    return true;
  }
}
