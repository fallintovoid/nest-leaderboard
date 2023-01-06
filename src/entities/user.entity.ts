import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ default: false })
  admin: boolean;

  @Column()
  password: string;

  @Column({ default: 0 })
  points: number;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  img: string;

  @Column({ type: 'simple-array', default: [] })
  achievments: any[];

  @Column({ type: 'simple-array', default: [] })
  purchaseHistory: any[];

  @Column({ type: 'simple-array', default: [] })
  pointsHistory: any[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
