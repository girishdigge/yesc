import express from 'express';
// import path from 'path';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deactivateUser,
  getAllEngineers,
  getAllSeniors,
  // deleteUser,
} from '../controllers/usersController.js';
import verifyJWT from '../middleware/verifyJWT.js';
const router = express.Router();
router.use(verifyJWT);
router.get('/engineers', getAllEngineers);
router.get('/seniors', getAllSeniors);
router.get('/:id', getUserById);
router.patch('/delete', deactivateUser);
router.get('/', getAllUsers);
router.post('/', createUser);
router.patch('/', updateUser);
// router.delete('/', deleteUser);

export default router;
