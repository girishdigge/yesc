import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Todo = sequelize.define(
  'Todo',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
    Project_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Project_Id: {
      type: DataTypes.INTEGER,
    },
    Inhouse_Engineer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SeniorReview: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Senior: {
      type: DataTypes.STRING,
    },
    SeniorQuery: {
      type: DataTypes.STRING,
    },
    AdminQuery: {
      type: DataTypes.STRING,
    },
    FinalReview: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Activity: {
      type: DataTypes.JSON, // Correct usage of JSON data type
      defaultValue: [], // Default value as an empty array
    },
    Deadline: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: 'Assigned Date must be a valid date' },
      },
    },
    Mailed: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: 'todos',
  }
);

// Sync the model with the database
Todo.sync({ force: false })
  .then(() => {
    console.log('Todo model synced with database');
  })
  .catch((err) => {
    console.error('Error syncing Todo model:', err);
  });

export default Todo;
