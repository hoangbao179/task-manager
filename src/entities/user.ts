import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')  // Tên bảng là 'users'
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, name: 'name' })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true, name: 'email' })
  email!: string;

  @Column({ type: 'varchar', length: 255, name: 'password' })
  password!: string;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'role' })
  role?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;
}
