import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret:
        '92a50e03cfafb15abaf1819b66f5ee8277b86ea734568d7543c4d5e747ca0dc1',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
