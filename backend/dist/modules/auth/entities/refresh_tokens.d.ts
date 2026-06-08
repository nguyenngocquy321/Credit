import { User } from '../../users/entities/user.entity';
export declare class RefreshTokenEntity {
    id: number;
    token_hash: string;
    is_revoked: boolean;
    expires_at: Date;
    user: User;
}
