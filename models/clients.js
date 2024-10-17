import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Client = sequelize.define(
  'Client',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'First name is required' },
        len: {
          args: [1],
          msg: 'First name should be at least 1 character',
        },
      },
    },
    middle_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Last name is required' },
        len: {
          args: [1],
          msg: 'Last name should be at least 1 character',
        },
      },
    },

    email: {
      type: DataTypes.STRING,

      validate: {
        isEmail: { msg: 'Enter a valid email address' },
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [10],
          msg: 'Enter a valid phone number (at least 10 digits)',
        },
      },
    },
    firm: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: 'clients',
  }
);

// Sync the model with the database
Client.sync({ force: false })
  .then(() => {
    console.log('Client model synced with database');
  })
  .catch((err) => {
    console.error('Error syncing Client model:', err);
  });

export default Client;
