export declare class RedisService {
    private redis;
    addToBlacklist(token: string, durationInSeconds: number): Promise<void>;
    isBlacklisted(token: string): Promise<boolean>;
}
