import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Nhớ import ValidationPipe

async function bootstrap() {
  // 1. Tạo app TRƯỚC
  const app = await NestFactory.create(AppModule);

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
