const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const CalendarEventStatus = require('../enums/calendar-event.status');

const CalendarEvent = sequelize.define('calendar-event', {
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
  timestamps: false, 
});

module.exports = CalendarEvent;
