import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/users/entities/user.entity';
import { RefreshTokenEntity } from './modules/auth/entities/refresh_tokens';
import { PackageModule } from './modules/package/package.module';
import { Package } from './modules/package/entities/package.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/role-auth.guard';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, RefreshTokenEntity, Package],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PackageModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
