'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('calendar-event', 'startDate', 'start_date');
    await queryInterface.renameColumn('calendar-event', 'dueDate', 'due_date');

    // create user table
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      user_name: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: { 
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: { 
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: { 
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addColumn('calendar-event', 'user_id', {
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('calendar-event', 'user_id');
    await queryInterface.renameColumn('calendar-event', 'start_date', 'startDate');
    await queryInterface.renameColumn('calendar-event', 'due_date', 'dueDate');
    await queryInterface.dropTable('user');
  },
};
