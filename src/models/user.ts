// src/models/userModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/connection';

export interface IUser {
  id: string;
  userName: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes extends Optional<IUser, 'id'> {}

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: string;
  public userName!: string;
  public password!: string;
  public email!: string;
  public firstName?: string;
  public lastName?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'user_name',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'email',
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'last_name',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at',
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'user',
  timestamps: true,
});

export default User;
