import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/connection';
import TaskStatus from '../enums/TaskStatus';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  startDate: Date;
  dueDate: Date;
}

export interface TaskCreationAttributes extends Optional<ITask, 'id'> {}

class Task extends Model<ITask, TaskCreationAttributes> implements ITask {
  public id!: string;
  public title!: string;
  public description!: string;
  public status!: TaskStatus;
  public startDate!: Date;
  public dueDate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init({
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
  sequelize,
  tableName: 'tasks',
  timestamps: false,
});

export default Task;
