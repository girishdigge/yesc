import Leave from '../models/leaves.js';
import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

// Get all leaves with filtering
export const getAllLeaves = asyncHandler(async (req, res) => {
  const username = req.query.username || '';
  const role = req.query.role || '';
  const status = req.query.status || '';

  const whereCondition = {
    ...((role === 'engineer' || role === 'senior') && {
      username: { [Op.like]: `%${username}%` },
    }),
    ...((role === 'admin' || role === 'root') &&
      status === 'Pending' && {
        status: { [Op.like]: 'Pending' },
      }),
  };

  const { count, rows: leaves } = await Leave.findAndCountAll({
    where: whereCondition,
  });

  if (!leaves || leaves.length === 0) {
    return res.status(400).json({ message: 'No leaves found!' });
  }

  res.json({
    leaves,
    totalLeaves: count,
  });
});

// Get leave by ID
export const getLeaveById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const leave = await Leave.findByPk(id);

  if (!leave) {
    return res.status(404).json({ message: 'Leave request not found' });
  }

  res.json(leave);
});

// Create new leave request
export const createLeave = asyncHandler(async (req, res) => {
  const { username, role, start, end, message, status } = req.body;

  // Validate required fields
  if (!username || !start || !end) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const startDate = new Date(start);
  const endDate = new Date(end);
  const today = new Date();
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  console.log(today, startDate, endDate);
  if (today > startDate || today > endDate) {
    return res.status(400).json({ message: 'Invalid date' });
  }
  if (startDate > endDate) {
    return res.status(400).json({ message: 'Invalid date range' });
  }

  // // Check for overlapping leave requests
  // const overlappingLeave = await Leave.findOne({
  //   where: {
  //     username,
  //     [Op.or]: [
  //       {
  //         start: {
  //           [Op.between]: [start, end],
  //         },
  //       },
  //       {
  //         end: {
  //           [Op.between]: [start, end],
  //         },
  //       },
  //     ],
  //     status: {
  //       [Op.notIn]: ['Rejected'],
  //     },
  //   },
  // });
  // console.log(overlappingLeave);

  // if (overlappingLeave) {
  //   return res.status(400).json({
  //     message: 'You already have a leave request for these dates',
  //   });
  // }

  // Create leave request
  const leave = await Leave.create({
    username,
    role,
    start,
    end,
    message,
    status: status || 'Pending',
  });
  console.log(leave);

  if (leave) {
    res.status(201).json(leave);
  } else {
    res.status(400).json({ message: 'Invalid leave data received' });
  }
});

// Update leave status
export const updateLeave = asyncHandler(async (req, res) => {
  const { id, status, remarks } = req.body;

  // Validate required fields
  if (!id || !status) {
    return res.status(400).json({ message: 'ID and status are required' });
  }

  const leave = await Leave.findByPk(id);

  if (!leave) {
    return res.status(404).json({ message: 'Leave request not found' });
  }

  // Update leave status
  leave.status = status;
  leave.remarks = remarks;
  await leave.save();

  res.json(leave);
});

// Delete leave request
export const deleteLeave = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(req.body);

  if (!id) {
    return res.status(400).json({ message: 'Leave ID required' });
  }

  const leave = await Leave.findByPk(id);

  if (!leave) {
    return res.status(404).json({ message: 'Leave request not found' });
  }

  await leave.destroy();

  res.json({ message: 'Leave request deleted' });
});

// Get total leaves count
export const getTotalLeavesCount = asyncHandler(async (req, res) => {
  const { username, role } = req.query;

  const whereCondition = {
    ...((role === 'engineer' || role === 'senior') && {
      username: { [Op.like]: `%${username}%` },
    }),
  };

  const count = await Leave.count({
    where: whereCondition,
  });

  res.json({ count });
});
