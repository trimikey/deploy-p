export class Auth {}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // Sử dụng bảng 'users' cho auth
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}