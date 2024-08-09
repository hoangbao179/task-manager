import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/connection';
import { CalendarEventStatus } from '../enums/calendar-event.status';

export interface ICalendarEvent {
  id: string;
  title: string;
  description: string;
  status: CalendarEventStatus;
  startDate: Date;
  dueDate: Date;
}

export interface ICalendarEventCreationAttributes extends Optional<ICalendarEvent, 'id'> {}

class CalendarEvent extends Model<ICalendarEvent, ICalendarEventCreationAttributes> implements ICalendarEvent {
  public id!: string;
  public title!: string;
  public description!: string;
  public status!: CalendarEventStatus;
  public startDate!: Date;
  public dueDate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CalendarEvent.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: CalendarEventStatus.PENDING,
    validate: {
      isIn: {
        args: [[CalendarEventStatus.PENDING, CalendarEventStatus.COMPLETED]],
        msg: 'Invalid status value',
      },
    },
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'calendar-event',
  timestamps: false,
});

export default CalendarEvent;
