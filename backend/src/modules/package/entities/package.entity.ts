import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  credit_amount: number;

  @Column({ default: true })
  is_active: boolean;
}
