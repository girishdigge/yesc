import express from 'express';
// import path from 'path';
import {
  getAllGrievances,
  getGrievanceById,
  createGrievance,
  updateGrievance,
  deleteGrievance,
  getTotalGrievancesCount,
} from '../controllers/grievancesController.js';
import verifyJWT from '../middleware/verifyJWT.js';
const router = express.Router();
router.use(verifyJWT);

router.get('/count', getTotalGrievancesCount);
router.get('/:id', getGrievanceById);
router.delete('/delete', deleteGrievance);
router.get('/', getAllGrievances);
router.post('/', createGrievance);
router.patch('/', updateGrievance);

export default router;
