// src/models/taskModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const TaskStatus = require('../enums/TaskStatus');

const Task = sequelize.define('Task', {
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
    defaultValue: TaskStatus.PENDING,
    validate: {
      isIn: {
        args: [[TaskStatus.PENDING, TaskStatus.COMPLETED]],
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

module.exports = Task;
