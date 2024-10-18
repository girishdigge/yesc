import Project from '../models/projects.js'; // Assuming you have a Project model
import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

// Get all projects with pagination and optional filters
export const getAllProjects = asyncHandler(async (req, res) => {
  // Get offset and limit from query parameters with defaults
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  // Filter projects by name, status, or category if provided in query
  const name = req.query.name || '';
  const status = req.query.status || '';
  const category = req.query.category || '';
  const username = req.query.username || '';
  const role = req.query.role || '';

  const whereCondition = {
    ...(name && {
      [Op.or]: [
        { Project_Name: { [Op.like]: `%${name}%` } },
        { Project_Job_Number: { [Op.like]: `%${name}%` } },
      ],
    }),
    ...(role === 'engineer' && {
      Inhouse_Engineer: { [Op.like]: `%${username}%` },
    }),
    // ...(role === 'senior' && {
    //   Senior: { [Op.like]: `%${username}%` },
    // }),
    ...(status && { Project_Status: { [Op.like]: `%${status}%` } }),
    ...(category && { Project_Job_Category: { [Op.like]: `%${category}%` } }),
  };

  // Fetch projects with the specified conditions and pagination
  const { count, rows: projects } = await Project.findAndCountAll({
    where: whereCondition,
    offset,
    limit,
  });

  // Check if any projects are found
  if (!projects || projects.length === 0) {
    return res.status(400).json({ message: 'No projects found!' });
  }

  // Return the projects data with pagination metadata
  res.json({
    projects,
    totalProjects: count,
    page: Math.floor(offset / limit) + 1,
    pageCount: Math.ceil(count / limit),
  });
});
export const getAllTodoProjects = asyncHandler(async (req, res) => {
  const whereCondition = {
    active: true, // Only retrieve records where active is true
    ...{},
  };

  const { count, rows: projects } = await Project.findAndCountAll({
    where: whereCondition,
  });

  // Check if projects were found
  if (!projects || projects.length === 0) {
    return res.status(400).json({ message: 'No projects found!' });
  }

  // Send the projects along with metadata (like total count for further pagination)
  res.json({
    projects,
    totalProjects: count,
  });
});
// Get a single project by its ID
export const getProjectById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Fetch the project by ID
  const project = await Project.findOne({
    where: { id },
  });

  const filteredProject = Object.fromEntries(
    Object.entries(project.dataValues).filter(([_, value]) => value !== null)
  );
  // If project not found, return 404 error
  if (!project) {
    return res.status(404).json({ message: `Project with ID ${id} not found` });
  }

  // If found, return the project data
  res.json({ project: filteredProject });
});

// Create a new project

// Create a new project
export const createProject = asyncHandler(async (req, res) => {
  console.log('data:', req.body.buildingStructure[0]);

  const {
    ArchitectName,
    EngineerName,
    ArEmail,
    ErEmail,
    FirmName,
    ContactDetails,

    // SBC_File,
    SBC_Number,
    Overhead_Tank,
    Underground_Tank,
    Septic_Tank,
    Overhead_Tank_Position,
    Overhead_Tank_Capacity,
    Underground_Tank_Position,
    Underground_Tank_Capacity,
    Septic_Tank_Position,
    Septic_Tank_Capacity,
    Future_Expantion,
    No_of_Floors,
    Remarks,
    Inhouse_Engineer,
    Client,
    Project_Name,
    Project_Job_Number,
    Assigned_Date,
    Project_Address,
    Project_Job_Category,
    Project_Job_Type,
    Project_Status,
    Building_Status,
    Completed_Floors,
    Site_Person_Name,
    Site_Email,
    Site_Phone1,
    Site_Phone2,
    Owner_Name,
    Owner_Email,
    Owner_Phone1,
    Owner_Phone2,
  } = req.body;

  // Validate mandatory fields
  if (
    !Project_Name ||
    !Project_Job_Number ||
    !Project_Job_Category ||
    !Project_Job_Type ||
    !Project_Status
  ) {
    return res
      .status(400)
      .json({ message: 'All mandatory fields are required' });
  }
  // const Activity = initialProjectConfig(req.body);
  //  Optional: You can add additional validation logic for complex fields like SBC_File or tank capacities
  // console.log(Activity);
  const buildingStructure = [
    { id: 0, name: 'Not Started', order: 0 },
    ...req.body.buildingStructure,
  ];
  const Activity = [buildingStructure[0].name];

  // Create the project entry in the database
  const project = await Project.create({
    ArchitectName,
    EngineerName,
    ArEmail,
    ErEmail,
    FirmName,
    ContactDetails,

    // SBC_File,
    SBC_Number,
    Overhead_Tank,
    Septic_Tank,
    Overhead_Tank_Position,
    Overhead_Tank_Capacity,
    Underground_Tank,
    Underground_Tank_Position,
    Underground_Tank_Capacity,
    Septic_Tank_Position,
    Septic_Tank_Capacity,
    Future_Expantion,
    No_of_Floors,
    Remarks,
    Inhouse_Engineer,
    Client,
    Project_Name,
    Project_Job_Number,
    Assigned_Date,
    Project_Address,
    Project_Job_Category,
    Project_Job_Type,
    Project_Status,
    Building_Status,
    Completed_Floors,
    Site_Person_Name,
    Site_Email,
    Site_Phone1,
    Site_Phone2,
    Owner_Name,
    Owner_Email,
    Owner_Phone1,
    Owner_Phone2,
    buildingStructure,
    Activity,
  });

  // If project creation is successful
  if (project) {
    res.status(201).json({
      message: `New project ${Project_Name} created successfully`,
      project,
    });
  } else {
    res.status(400).json({ message: 'Invalid project data received' });
  }
});

// Update an existing project

// Update an existing project
export const updateProject = asyncHandler(async (req, res) => {
  const {
    id,
    ArchitectName,
    EngineerName,
    ArEmail,
    ErEmail,
    FirmName,
    ContactDetails,
    // SBC_File,
    SBC_Number,
    Overhead_Tank,
    Underground_Tank,
    Septic_Tank,
    Overhead_Tank_Position,
    Overhead_Tank_Capacity,
    Underground_Tank_Position,
    Underground_Tank_Capacity,
    Septic_Tank_Position,
    Septic_Tank_Capacity,
    Future_Expantion,
    No_of_Floors,

    Remarks,
    Inhouse_Engineer,
    Client,
    Project_Name,
    Project_Job_Number,
    Assigned_Date,
    Project_Address,
    Project_Job_Category,
    Project_Job_Type,
    Project_Status,
    Building_Status,
    Completed_Floors,
    Site_Person_Name,
    Site_Email,
    Site_Phone1,
    Site_Phone2,
    Owner_Name,
    Owner_Email,
    Owner_Phone1,
    Owner_Phone2,
    Activity,
  } = req.body;

  // Check if the project ID and required fields are provided
  if (
    !id ||
    !Project_Name ||
    !Project_Job_Number ||
    !Project_Job_Category ||
    !Project_Job_Type ||
    !Project_Status
  ) {
    return res
      .status(400)
      .json({ message: 'All mandatory fields are required' });
  }

  // Find the project by ID
  const project = await Project.findByPk(id);

  // If the project is not found
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  // Update the project with the new data
  const updatedProject = await project.update({
    ArchitectName,
    EngineerName,
    ArEmail,
    ErEmail,
    FirmName,
    ContactDetails,
    // SBC_File,
    SBC_Number,
    Overhead_Tank,
    Underground_Tank,
    Septic_Tank,
    Overhead_Tank_Position,
    Overhead_Tank_Capacity,
    Underground_Tank_Position,
    Underground_Tank_Capacity,
    Septic_Tank_Position,
    Septic_Tank_Capacity,
    Future_Expantion,
    No_of_Floors,

    Remarks,
    Inhouse_Engineer,
    Client,
    Project_Name,
    Project_Job_Number,
    Assigned_Date,
    Project_Address,
    Project_Job_Category,
    Project_Job_Type,
    Project_Status,
    Building_Status,
    Completed_Floors,
    Site_Person_Name,
    Site_Email,
    Site_Phone1,
    Site_Phone2,
    Owner_Name,
    Owner_Email,
    Owner_Phone1,
    Owner_Phone2,
    Activity,
  });

  // Return a success message and the updated project
  res.json({
    message: `Project ${Project_Name} updated successfully`,
    updatedProject,
  });
});

// Deactivate (soft delete) a project

// Deactivate a project (soft delete)
export const deactivateProject = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Check if the project ID is provided
  if (!id) {
    return res.status(400).json({ message: 'Project ID is required' });
  }

  // Find the project by ID
  const project = await Project.findByPk(id);

  // If the project is not found
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  // Deactivate (soft delete) the project by setting active to false
  const updatedProject = await project.update({
    active: false, // Assuming you have an 'active' field for soft deletion
  });

  // Return a success message and the updated project
  res.json({
    message: `Project ${project.Project_Name} deactivated successfully`,
    updatedProject,
  });
});
export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Check if the project ID is provided
  if (!id) {
    return res.status(400).json({ message: 'Project ID is required' });
  }

  // Find the project by ID
  const project = await Project.findByPk(id);

  // If the project is not found
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  // Deactivate (soft delete) the project by setting active to false
  await project.destroy({
    where: { id },
  });

  // Return a success message and the updated project
  res.json({
    message: `Project ${project.Project_Name} deleted successfully`,
  });
});

export const projectActivity = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Project ID is required' });
  }

  // Find the project by ID
  const project = await Project.findByPk(id);

  // If the project is not found
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
});

export const getTotalProjectsCount = asyncHandler(async (req, res) => {
  console.log(111);

  // const name = req.query.name || '';
  const username = req.query.username || '';
  const role = req.query.role || '';
  const Project_Id = req.query.Project_Id || '';
  const Mailed = req.query.Mailed || '';

  const whereCondition = {
    // ...(name && {
    //   [Op.or]: [
    //     { Title: { [Op.like]: `%${name}%` } },
    //     { Project_Name: { [Op.like]: `%${name}%` } },
    //     { Project_Id: { [Op.like]: `%${Project_Id}%` } },
    //   ],
    // }),
    ...(role === 'engineer' && {
      Inhouse_Engineer: { [Op.like]: `%${username}%` },
    }),
    // ...(Mailed === 'Pending' && {
    //   Mailed: { [Op.like]: 'Pending' },
    // }),
    // ...(role === 'senior' && {
    //   Senior: { [Op.like]: `%${username}%` },
    // }),
  };

  const totalProjects = await Project.count({ where: whereCondition });

  // Count projects where Status is 'Completed'
  const completedProjectsCount = await Project.count({
    where: {
      ...whereCondition,
      Project_Status: { [Op.like]: 'Completed' }, // Only count Completed projects
    },
  });

  console.log({ totalProjects, completedProjectsCount });

  // Return the total count and the count of completed projects
  res.json({
    totalProjects,
    completedProjectsCount, // Only return the count of completed todos
  });
});
