// redis.service.ts
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  });

  // Lưu token vào blacklist
  async addToBlacklist(token: string, durationInSeconds: number) {
    // Lưu với key là token, value là 'true'
    await this.redis.set(token, 'true', 'EX', durationInSeconds);
  }

  // Kiểm tra token có trong blacklist không
  async isBlacklisted(token: string): Promise<boolean> {
    if (!token) {
      throw new Error('Không có token');
    }
    const result = await this.redis.get(token);

    return result === 'true';
  }
}
