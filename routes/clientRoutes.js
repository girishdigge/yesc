import express from 'express';
// import path from 'path';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deactivateClient,
  getProjectClients,
  // deleteClient,
} from '../controllers/clientsController.js';
import verifyJWT from '../middleware/verifyJWT.js';
const router = express.Router();
router.use(verifyJWT);
router.get('/projectClients', getProjectClients);
router.get('/:id', getClientById);
router.patch('/delete', deactivateClient);
router.get('/', getAllClients);
router.post('/', createClient);
router.patch('/', updateClient);
// router.delete('/', deleteClient);

export default router;
