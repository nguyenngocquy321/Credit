import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Nhớ import ValidationPipe

async function bootstrap() {
  // 1. Tạo app TRƯỚC
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
    ], // Danh sách các domain cho phép
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Các phương thức cho phép
    credentials: true, // Cho phép gửi kèm cookie/session/authorization
    allowedHeaders: 'Content-Type, Authorization', // Các header được chấp nhận
  });
  // 2. Sau đó mới dùng app để cấu hình các Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  // 3. Cuối cùng mới listen cổng
  await app.listen(3000);
}

bootstrap();
