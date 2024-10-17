import Todo from '../models/todos.js'; // Assuming you have a Todo model
import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

// Get all todos with pagination and optional filters
export const getAllTodos = asyncHandler(async (req, res) => {
  // Get offset and limit from query parameters with defaults
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;
  console.log(req.query);

  // Filter todos by name, status, or category if provided in query
  const name = req.query.name || '';
  const username = req.query.username || '';
  const role = req.query.role || '';
  const Project_Id = req.query.Project_Id || '';
  const Mailed = req.query.Mailed || '';
  // const status = req.query.status || '';
  // const category = req.query.category || '';

  const whereCondition = {
    ...(name && {
      [Op.or]: [
        { Title: { [Op.like]: `%${name}%` } },
        { Project_Name: { [Op.like]: `%${name}%` } },
        { Project_Id: { [Op.like]: `%${Project_Id}%` } },
      ],
    }),
    ...(role === 'engineer' && {
      Inhouse_Engineer: { [Op.like]: `%${username}%` },
    }),
    ...(Mailed === 'Pending' && {
      Mailed: { [Op.like]: 'Pending' },
    }),
    ...(role === 'senior' && {
      Senior: { [Op.like]: `%${username}%` },
    }),
    // ...(status && { Todo_Status: { [Op.like]: `%${status}%` } }),
    // ...(category && { Todo_Job_Category: { [Op.like]: `%${category}%` } }),
  };

  // Fetch todos with the specified conditions and pagination

  const { count, rows: todos } = await Todo.findAndCountAll({
    where: whereCondition,
    offset,
    limit,
  });
  console.log('Todos:', count);

  // Check if any todos are found
  if (!todos || todos.length === 0) {
    return res.status(400).json({ message: 'No todos found!' });
  }
  console.log(Math.ceil(count / limit));
  // Return the todos data with pagination metadata
  res.json({
    todos,
    totalTodos: count,
    page: Math.floor(offset / limit) + 1,
    pageCount: Math.ceil(count / limit),
  });
});

// Get a single todo by its ID
export const getTodoById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Fetch the todo by ID
  const todo = await Todo.findOne({
    where: { id },
  });

  const filteredTodo = Object.fromEntries(
    Object.entries(todo.dataValues).filter(([_, value]) => value !== null)
  );
  console.log(filteredTodo);
  // If todo not found, return 404 error
  if (!todo) {
    return res.status(404).json({ message: `Todo with ID ${id} not found` });
  }

  // If found, return the todo data
  res.json({ todo: filteredTodo });
});

// Create a new todo

// Create a new todo
export const createTodo = asyncHandler(async (req, res) => {
  const {
    Title,
    Description,
    Project_Id,
    Project_Name,
    Inhouse_Engineer,
    Status,
    Deadline,
  } = req.body;

  // Validate mandatory fields
  if (!Title || !Project_Name || !Inhouse_Engineer || !Status || !Deadline) {
    return res
      .status(400)
      .json({ message: 'All mandatory fields are required' });
  }

  // Optional: You can add additional validation logic for complex fields like SBC_File or tank capacities

  // Create the todo entry in the database
  const todo = await Todo.create({
    Title,
    Description,
    Project_Id,
    Project_Name,
    Inhouse_Engineer,
    Status,
    Deadline,
  });

  // If todo creation is successful
  if (todo) {
    res.status(201).json({
      message: `New todo ${Title} created successfully`,
      todo,
    });
  } else {
    res.status(400).json({ message: 'Invalid todo data received' });
  }
});

// Update an existing todo
export const updateTodo = asyncHandler(async (req, res) => {
  const {
    id,
    Status,
    Description,
    SeniorReview,
    FinalReview,
    Senior,
    Activity,
    Mailed,
  } = req.body;

  let updatedData = {
    id,
    Status,
    Activity,
    Description,
    Senior,
    SeniorReview,
    FinalReview,
    Mailed,
  };
  console.log('updatedData:', updatedData);

  // Check if the todo ID and required fields are provided
  if (!id) {
    return res
      .status(400)
      .json({ message: 'All mandatory fields are required' });
  }

  const todo = await Todo.findByPk(id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  // if (SeniorReview) {
  //   const data = `review sent to ${Senior} on ${Date.now()}`;
  //   const Activity = [...todo.Activity, { data }];

  //   updatedData = { ...updatedData, SeniorReview, Activity, Senior };
  // }

  const updatedTodo = await todo.update(updatedData);
  res.json({
    message: `Todo ${id} updated successfully`,
    updatedTodo,
  });
});

// Deactivate a todo (soft delete)
export const deactivateTodo = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Check if the todo ID is provided
  if (!id) {
    return res.status(400).json({ message: 'Todo ID is required' });
  }

  // Find the todo by ID
  const todo = await Todo.findByPk(id);

  // If the todo is not found
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  // Deactivate (soft delete) the todo by setting active to false
  const updatedTodo = await todo.update({
    active: false, // Assuming you have an 'active' field for soft deletion
  });

  // Return a success message and the updated todo
  res.json({
    message: `Todo ${todo.Todo_Name} deactivated successfully`,
    updatedTodo,
  });
});
export const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Check if the todo ID is provided
  if (!id) {
    return res.status(400).json({ message: 'Todo ID is required' });
  }

  // Find the todo by ID
  const todo = await Todo.findByPk(id);

  // If the todo is not found
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  // Deactivate (soft delete) the todo by setting active to false
  await todo.destroy({
    where: { id },
  });

  // Return a success message and the updated todo
  res.json({
    message: `Todo ${todo.Todo_Name} deleted successfully`,
  });
});

export const getTotalTodosCount = asyncHandler(async (req, res) => {
  const username = req.query.username || '';
  const role = req.query.role || '';
  const Status = req.query.Status || '';
  const Mailed = req.query.Mailed || '';

  const whereCondition = {
    ...(role === 'engineer' && {
      Inhouse_Engineer: { [Op.like]: `%${username}%` },
    }),
    ...(Mailed === 'Pending' && {
      Mailed: { [Op.like]: 'Pending' },
    }),
    ...(Status === 'Completed' && {
      Status: { [Op.like]: 'Completed' },
    }),
    ...(role === 'senior' && {
      Senior: { [Op.like]: `%${username}%` },
    }),
  };

  // Get the total count of todos matching the filter
  const totalTodos = await Todo.count({ where: whereCondition });

  // Count todos where Status is 'Completed'
  const completedTodosCount = await Todo.count({
    where: {
      ...whereCondition,
      Status: { [Op.like]: 'Completed' }, // Only count Completed todos
    },
  });

  console.log({ totalTodos, completedTodosCount });

  // Return the total count and the count of completed todos
  res.json({
    totalTodos,
    completedTodosCount, // Only return the count of completed todos
  });
});
