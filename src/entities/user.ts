import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import { CalendarEvent } from './calendar-event';
@Entity('users') 
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, name: 'first_name', default: '' })
  firstName: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name', default: '' })
  lastName: string;

  @OneToMany(() => CalendarEvent, (event) => event.user)
  calendarEvents: CalendarEvent[];

  @Column({ type: 'varchar', length: 255, unique: true, name: 'email'})
  email!: string;

  @Column({ type: 'varchar', length: 255, name: 'password' })
  password!: string;

  @Column({ type: 'varchar', length: 50, name: 'role', nullable: true, default: 'user' })
  role?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at'})
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
