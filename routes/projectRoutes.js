import express from 'express';
// import path from 'path';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deactivateProject,
  deleteProject,
  getAllTodoProjects,
  projectActivity,
  getTotalProjectsCount,
} from '../controllers/projectsController.js';
import verifyJWT from '../middleware/verifyJWT.js';
const router = express.Router();
router.use(verifyJWT);
router.get('/count', getTotalProjectsCount);
router.get('/todoProjects', getAllTodoProjects);
router.get('/:id', getProjectById);
router.delete('/delete', deleteProject);
// router.patch('/delete', deactivateProject);
router.get('/', getAllProjects);
router.post('/projectActivity', projectActivity);
router.post('/', createProject);
router.patch('/', updateProject);

export default router;
