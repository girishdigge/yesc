import Meeting from '../models/meetings.js';
import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

// Get all meetings with filtering
export const getAllMeetings = asyncHandler(async (req, res) => {
  //   const username = req.query.username || '';
  const status = req.query.status || '';

  const whereCondition = {
    // ...(username && {
    //   username: { [Op.like]: `%${username}%` },
    // }),
    ...(status && {
      status: { [Op.like]: `%${status}%` },
    }),
  };

  const { count, rows: meetings } = await Meeting.findAndCountAll({
    where: whereCondition,
  });

  if (!meetings || meetings.length === 0) {
    return res.status(400).json({ message: 'No meetings found!' });
  }

  res.json({
    meetings,
    totalMeetings: count,
  });
});

// Get meeting by ID
export const getMeetingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    return res.status(404).json({ message: 'Meeting not found' });
  }

  res.json(meeting);
});

// Create new meeting
export const createMeeting = asyncHandler(async (req, res) => {
  const { username, date, time, agenda, client, project, status } = req.body;
  const remarks = '-';
  if (!username || !date) {
    return res.status(400).json({ message: 'date required' });
  }

  const givenDate = new Date(date);
  const today = new Date();
  givenDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  console.log(today, givenDate);
  if (today > givenDate) {
    return res.status(400).json({ message: 'Invalid date' });
  }

  const meeting = await Meeting.create({
    username,
    date,
    time,
    client,
    project,
    agenda,
    remarks,
    status: status || 'Scheduled',
  });
  console.log(meeting);

  if (meeting) {
    res.status(201).json(meeting);
  } else {
    res.status(400).json({ message: 'Invalid meeting data received' });
  }
});

// Update meeting
export const updateMeeting = asyncHandler(async (req, res) => {
  const { id, status, remarks } = req.body;

  if (!id || !status) {
    return res.status(400).json({ message: 'ID and status are required' });
  }

  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    return res.status(404).json({ message: 'Meeting not found' });
  }

  meeting.status = status;
  meeting.remarks = remarks;
  await meeting.save();

  res.json(meeting);
});

// Delete meeting
export const deleteMeeting = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Meeting ID required' });
  }

  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    return res.status(404).json({ message: 'Meeting not found' });
  }

  await meeting.destroy();

  res.json({ message: 'Meeting deleted' });
});

// Get total meetings count
export const getTotalMeetingsCount = asyncHandler(async (req, res) => {
  const { username } = req.query;

  const whereCondition = {
    ...(username && {
      username: { [Op.like]: `%${username}%` },
    }),
  };

  const count = await Meeting.count({
    where: whereCondition,
  });

  res.json({ count });
});
