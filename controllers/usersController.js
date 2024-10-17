import User from '../models/users.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

export const getAllUsers = asyncHandler(async (req, res) => {
  // Get the offset and limit from query parameters, with defaults in case they're not provided
  const offset = parseInt(req.query.offset) || 0; // Default offset is 0
  const limit = parseInt(req.query.limit) || 10; // Default limit is 10
  const name = req.query.name || '';
  console.log(name);
  const whereCondition = {
    active: true, // Only retrieve records where active is true
    role: { [Op.ne]: 'root' },
    ...(name && {
      [Op.or]: [
        { first_name: { [Op.like]: `%${name}%` } },
        { middle_name: { [Op.like]: `%${name}%` } },
        { last_name: { [Op.like]: `%${name}%` } },
      ],
    }),
  };
  // Find all users with pagination
  const { count, rows: employees } = await User.findAndCountAll({
    where: whereCondition,
    offset,
    limit,
    order: [['username', 'ASC']],
  });

  // Check if employees were found
  if (!employees || employees.length === 0) {
    return res.status(400).json({ message: 'No employees found!' });
  }

  // Send the employees along with metadata (like total count for further pagination)
  res.json({
    employees,
    totalEmployees: count,
    page: Math.floor(offset / limit) + 1,
    pageCount: Math.ceil(count / limit),
  });
});
export const getAllEngineers = asyncHandler(async (req, res) => {
  const whereCondition = {
    active: true, // Only retrieve records where active is true
    ...{
      role: 'engineer',
    },
  };
  // Find all users with pagination
  const { count, rows: employees } = await User.findAndCountAll({
    where: whereCondition,
  });

  // Check if employees were found
  if (!employees || employees.length === 0) {
    return res.status(400).json({ message: 'No seniors found!' });
  }

  // Send the employees along with metadata (like total count for further pagination)
  res.json({
    employees,
    totalEmployees: count,
  });
});
export const getAllSeniors = asyncHandler(async (req, res) => {
  const whereCondition = {
    active: true, // Only retrieve records where active is true
    ...{
      role: 'senior',
    },
  };
  // Find all users with pagination
  const { count, rows: employees } = await User.findAndCountAll({
    where: whereCondition,
  });

  // Check if employees were found
  if (!employees || employees.length === 0) {
    return res.status(400).json({ message: 'No employees found!' });
  }

  // Send the employees along with metadata (like total count for further pagination)
  res.json({
    employees,
    totalEmployees: count,
  });
});
export const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return res.status(400).json({ message: `user not found` });
  }
  res.json({ user });
});
export const createUser = asyncHandler(async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    username,
    role,
    email,
    phone,
    password,
    profile_picture,
  } = req.body;
  if (
    !first_name ||
    !middle_name ||
    !last_name ||
    !username ||
    !role ||
    !email ||
    !phone ||
    !password
  ) {
    return res.status(400).json({ message: 'All fields are mandetory' });
  }
  const duplicate = await User.findOne({
    where: { username: username },
  });
  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate Username' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    first_name,
    middle_name,
    last_name,
    username,
    role,
    email,
    phone,
    password: hashedPassword,
    profile_picture,
  });
  if (user) {
    res.status(201).json({ message: `new user ${username} created` });
  } else {
    res.status(400).json({ message: 'Invalid user data received' });
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const {
    id,
    first_name,
    middle_name,
    last_name,
    username,
    role,
    email,
    phone,
    password,
    profile_picture,
  } = req.body;
  console.log(req.body);

  if (
    !id ||
    !first_name ||
    !middle_name ||
    !last_name ||
    !username ||
    !role ||
    !email ||
    !phone
  ) {
    return res.status(400).json({ message: 'All fields  are mandatory' });
  }

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (password?.length >= 4) {
    updatePassword(id, password);
  }

  const updatedUser = await user.update({
    first_name,
    middle_name,
    last_name,
    username,
    role,
    email,
    phone,
    profile_picture,
  });

  res.json({ message: `User ${username} updated successfully`, updatedUser });
});

const updatePassword = asyncHandler(async (id, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = await user.update({
    password: hashedPassword,
  });
  console.log(updatedUser);

  return updatedUser;
});

export const deactivateUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id, req.body);

  const user = await User.findOne({
    where: { id },
  });
  if (!user) {
    return res.status(400).json({ message: `user not found` });
  }
  const active = false;
  const updatedUser = await user.update({
    ...user,
    active,
  });

  res.json({ message: `User deleted successfully`, updatedUser });
});
