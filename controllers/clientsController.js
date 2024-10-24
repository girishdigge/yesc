import Client from '../models/clients.js';
import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

export const getAllClients = asyncHandler(async (req, res) => {
  // Get the offset and limit from query parameters, with defaults in case they're not provided
  const offset = parseInt(req.query.offset) || 0; // Default offset is 0
  const limit = parseInt(req.query.limit) || 10; // Default limit is 10
  const name = req.query.name || '';
  console.log(name);
  const whereCondition = {
    active: true, // Only retrieve records where active is true
    ...(name && {
      [Op.or]: [
        { first_name: { [Op.like]: `%${name}%` } },
        { middle_name: { [Op.like]: `%${name}%` } },
        { last_name: { [Op.like]: `%${name}%` } },
      ],
    }),
  };
  // Find all clients with pagination
  const { count, rows: clients } = await Client.findAndCountAll({
    where: whereCondition,
    offset,
    limit,
    // order: [['clientname', 'ASC']],
  });

  // Check if clients were found
  if (!clients || clients.length === 0) {
    return res.status(400).json({ message: 'No clients found!' });
  }

  // Send the clients along with metadata (like total count for further pagination)
  res.json({
    clients,
    totalClients: count,
    page: Math.floor(offset / limit) + 1,
    pageCount: Math.ceil(count / limit),
  });
});
export const getProjectClients = asyncHandler(async (req, res) => {
  const whereCondition = {
    active: true, // Only retrieve records where active is true
    ...{},
  };
  // Find all users with pagination
  const { count, rows: clients } = await Client.findAndCountAll({
    where: whereCondition,
  });

  // Check if clients were found
  if (!clients || clients.length === 0) {
    return res.status(400).json({ message: 'No clients found!' });
  }

  // Send the clients along with metadata (like total count for further pagination)
  res.json({
    clients,
    totalClients: count,
  });
});
export const getClientById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const client = await Client.findOne({
    where: { id },
  });

  if (!client) {
    return res.status(400).json({ message: `client not found` });
  }
  res.json({ client });
});
export const createClient = asyncHandler(async (req, res) => {
  let middle_name = req.body.middle_name;
  const { first_name, last_name, email, phone, firm, location, remarks } =
    req.body;
  if (!first_name || !last_name) {
    return res.status(400).json({ message: 'All fields are mandetory' });
  }

  if (!middle_name) {
    middle_name = '';
  }
  console.log(middle_name);

  const client = await Client.create({
    first_name,
    middle_name,
    last_name,
    email,
    phone,
    firm,
    location,
    remarks,
  });
  if (client) {
    res
      .status(201)
      .json({ message: `new client ${(first_name, ' ', last_name)} created` });
  } else {
    res.status(400).json({ message: 'Invalid client data received' });
  }
});

export const updateClient = asyncHandler(async (req, res) => {
  const {
    id,
    first_name,
    middle_name,
    last_name,
    email,
    phone,
    firm,
    location,
    remarks,
  } = req.body;
  console.log(req.body);

  if (!id || !first_name || !last_name) {
    return res.status(400).json({ message: 'All fields  are mandatory' });
  }

  const client = await Client.findByPk(id);
  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }

  const updatedClient = await client.update({
    first_name,
    middle_name,
    last_name,
    email,
    phone,
    firm,
    location,
    remarks,
  });

  res.json({
    message: `Client ${first_name} updated successfully`,
    updatedClient,
  });
});

export const deactivateClient = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id, req.body);

  const client = await Client.findOne({
    where: { id },
  });
  if (!client) {
    return res.status(400).json({ message: `client not found` });
  }
  const active = false;
  const updatedClient = await client.update({
    ...client,
    active,
  });

  res.json({ message: `Client deleted successfully`, updatedClient });
});
