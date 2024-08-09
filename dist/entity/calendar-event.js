import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection';
import { CalendarEventStatus } from '../enums/calendar-event.status';
class CalendarEvent extends Model {
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
