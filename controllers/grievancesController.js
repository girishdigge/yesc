import Grievance from '../models/grievances.js';
import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

// Get all grievances with filtering
export const getAllGrievances = asyncHandler(async (req, res) => {
  const username = req.query.username || '';
  const role = req.query.role || '';
  const status = req.query.status || '';

  const whereCondition = {
    ...((role === 'engineer' || role === 'senior') && {
      username: { [Op.like]: `%${username}%` },
    }),
    ...((role === 'admin' || role === 'root') &&
      status === 'Raised' && {
        status: { [Op.like]: 'Raised' },
      }),
  };

  const { count, rows: grievances } = await Grievance.findAndCountAll({
    where: whereCondition,
  });

  if (!grievances || grievances.length === 0) {
    return res.status(400).json({ message: 'No grievances found!' });
  }

  res.json({
    grievances,
    totalGrievances: count,
  });
});

// Get grievance by ID
export const getGrievanceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const grievance = await Grievance.findByPk(id);

  if (!grievance) {
    return res.status(404).json({ message: 'Grievance request not found' });
  }

  res.json(grievance);
});

// Create new grievance request
export const createGrievance = asyncHandler(async (req, res) => {
  const { username, role, message, status } = req.body;
  console.log(req.body);

  // Validate required fields
  if (!username || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const grievance = await Grievance.create({
    username,
    role,
    message,
    status: status || 'Raised',
  });
  console.log(grievance);

  if (grievance) {
    res.status(201).json(grievance);
  } else {
    res.status(400).json({ message: 'Invalid grievance data received' });
  }
});

// Update grievance status
export const updateGrievance = asyncHandler(async (req, res) => {
  const { id, status, remarks } = req.body;

  // Validate required fields
  if (!id || !status) {
    return res.status(400).json({ message: 'ID and status are required' });
  }

  const grievance = await Grievance.findByPk(id);

  if (!grievance) {
    return res.status(404).json({ message: 'Grievance request not found' });
  }

  // Update grievance status
  grievance.status = status;
  grievance.remarks = remarks;
  await grievance.save();

  res.json(grievance);
});

// Delete grievance request
export const deleteGrievance = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(req.body);

  if (!id) {
    return res.status(400).json({ message: 'Grievance ID required' });
  }

  const grievance = await Grievance.findByPk(id);

  if (!grievance) {
    return res.status(404).json({ message: 'Grievance request not found' });
  }

  await grievance.destroy();

  res.json({ message: 'Grievance request deleted' });
});

// Get total grievances count
export const getTotalGrievancesCount = asyncHandler(async (req, res) => {
  const { username, role } = req.query;

  const whereCondition = {
    ...((role === 'engineer' || role === 'senior') && {
      username: { [Op.like]: `%${username}%` },
    }),
  };

  const count = await Grievance.count({
    where: whereCondition,
  });

  res.json({ count });
});
