import { Strategy } from 'passport-jwt';
import { RedisService } from '../redis/redis.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly redisService;
    constructor(redisService: RedisService);
    validate(req: any, payload: any): Promise<{
        userId: any;
        email: any;
        name: any;
        role: any;
        total_credits: any;
        isDeleted: any;
        isBanned: any;
    }>;
}
export {};
