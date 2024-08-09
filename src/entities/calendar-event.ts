import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CalendarEventStatus } from '../enums/calendar-event.status';

@Entity('calendar_events') 
export class CalendarEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: CalendarEventStatus,
    default: CalendarEventStatus.PENDING,
  })
  status!: CalendarEventStatus;

  @Column({ type: 'timestamp', name: 'start_date' })  
  startDate!: Date;

  @Column({ type: 'timestamp', name: 'end_date' })  
  endDate!: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;
}
