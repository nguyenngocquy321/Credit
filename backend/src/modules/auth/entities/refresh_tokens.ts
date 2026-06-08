import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Import UserEntity của bạn

@Entity('refresh_tokens')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  token_hash: string; // Lưu hash của refresh token (dùng bcrypt)

  @Column({ default: false })
  is_revoked: boolean; // Dùng để thu hồi token thủ công

  @Column()
  expires_at: Date; // Thời hạn của token này

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // 'CASCADE' giúp tự xóa token khi user bị xóa
  @JoinColumn({ name: 'user_id' }) // Chỉ định rõ cột khóa ngoại là user_id
  user: User;
}
