import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Project = sequelize.define(
  'Project',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ArchitectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EngineerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ArEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'Enter a valid email address' },
      },
    },
    ErEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'Enter a valid email address' },
      },
    },
    FirmName: {
      type: DataTypes.STRING,
    },
    ContactDetails: {
      type: DataTypes.STRING,
    },
    SBC_File: {
      type: DataTypes.STRING, // You can adjust this based on your file handling
      defaultValue: '',
    },
    SBC_Number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Overhead_Tank: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Underground_Tank: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Septic_Tank: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Overhead_Tank_Position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Overhead_Tank_Capacity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Underground_Tank_Position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Underground_Tank_Capacity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Septic_Tank_Position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Septic_Tank_Capacity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Future_Expantion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    No_of_Floors: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Tie_Level: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Terrace_Floor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Staircase_Cap: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Remarks: {
      type: DataTypes.STRING,
    },
    Inhouse_Engineer: {
      type: DataTypes.STRING, // or DataTypes.INTEGER if it's a relation
      allowNull: false,
    },
    Client: {
      type: DataTypes.STRING, // or DataTypes.INTEGER if it's a relation
      allowNull: false,
    },
    Project_Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Project_Job_Number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Assigned_Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: 'Assigned Date must be a valid date' },
      },
    },
    Project_Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Project_Job_Category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Project_Job_Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Project_Status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Building_Status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Completed_Floors: {
      type: DataTypes.STRING,
    },
    Site_Person_Name: {
      type: DataTypes.STRING,
    },
    Site_Email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'Enter a valid email address' },
      },
    },
    Site_Phone1: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        len: { args: [10, 15], msg: 'Enter a valid phone number' },
      },
    },
    Site_Phone2: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        len: { args: [10, 15], msg: 'Enter a valid phone number' },
      },
    },
    Owner_Name: {
      type: DataTypes.STRING,
    },
    Owner_Email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'Enter a valid email address' },
      },
    },
    Owner_Phone1: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        len: { args: [10, 15], msg: 'Enter a valid phone number' },
      },
    },
    Owner_Phone2: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        len: { args: [10, 15], msg: 'Enter a valid phone number' },
      },
    },
    Activity: {
      type: DataTypes.JSON, // Correct usage of JSON data type
      defaultValue: [], // Default value as an empty array
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: 'projects',
  }
);

// Sync the model with the database
Project.sync({ force: false })
  .then(() => {
    console.log('Project model synced with database');
  })
  .catch((err) => {
    console.error('Error syncing Project model:', err);
  });

export default Project;
