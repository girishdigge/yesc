import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Grievance = sequelize.define(
  'Grievance',
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
    message: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Raised',
    },
  },
  {
    timestamps: true,
    tableName: 'grievances',
  }
);

// Sync the model with the database
Grievance.sync({ force: false })
  .then(() => {
    console.log('Grievances model synced with database');
  })
  .catch((err) => {
    console.error('Error syncing Grievance model:', err);
  });

export default Grievance;
