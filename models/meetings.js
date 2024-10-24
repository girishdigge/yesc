import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Meeting = sequelize.define(
  'Meeting',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: 'Assigned Date must be a valid date' },
      },
    },
    time: {
      type: DataTypes.TIME,
    },
    Client: {
      type: DataTypes.STRING,
    },
    Project_Name: {
      type: DataTypes.STRING,
    },
    agenda: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Scheduled',
    },
  },
  {
    timestamps: true,
    tableName: 'meetings',
  }
);

// Sync the model with the database
Meeting.sync({ force: false })
  .then(() => {
    console.log('Meetings model synced with database');
  })
  .catch((err) => {
    console.error('Error syncing Meeting model:', err);
  });

export default Meeting;
