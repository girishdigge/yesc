import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Leave = sequelize.define(
  'Leave',
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
    start: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: 'Assigned Date must be a valid date' },
      },
    },
    end: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: 'Assigned Date must be a valid date' },
      },
    },
    message: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
    },
  },
  {
    timestamps: true,
    tableName: 'leaves',
  }
);

// Sync the model with the database
Leave.sync({ force: false })
  .then(() => {
    console.log('Leaves model synced with database');
  })
  .catch((err) => {
    console.error('Error syncing Leave model:', err);
  });

export default Leave;
