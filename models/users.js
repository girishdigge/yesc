import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const User = sequelize.define(
  'User',
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
      allowNull: false,
      validate: {
        notNull: { msg: 'Middle name is required' },
        len: {
          args: [1],
          msg: 'Middle name should be at least 1 character',
        },
      },
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Username is required' },
        len: {
          args: [1],
          msg: 'Username should be at least 1 character',
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'engineer',
      validate: {
        notNull: { msg: 'Role is required' },
        len: {
          args: [1],
          msg: 'Role should be at least 1 character',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Email is required' },
        isEmail: { msg: 'Enter a valid email address' },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Phone number is required' },
        len: {
          args: [10],
          msg: 'Enter a valid phone number (at least 10 digits)',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required' },
        len: {
          args: [1],
          msg: 'Password should be at least 1 character',
        },
      },
    },
    profile_picture: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: 'users',
  }
);

// Sync the model with the database
User.sync({ force: false })
  .then(() => {
    console.log('User model synced with database');
  })
  .catch((err) => {
    console.error('Error syncing User model:', err);
  });

export default User;
