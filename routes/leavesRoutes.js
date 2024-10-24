import express from 'express';
// import path from 'path';
import {
  getAllLeaves,
  getLeaveById,
  createLeave,
  updateLeave,
  deleteLeave,
  getTotalLeavesCount,
} from '../controllers/leavesController.js';
import verifyJWT from '../middleware/verifyJWT.js';
const router = express.Router();
router.use(verifyJWT);

router.get('/count', getTotalLeavesCount);
router.get('/:id', getLeaveById);
router.delete('/delete', deleteLeave);
router.get('/', getAllLeaves);
router.post('/', createLeave);
router.patch('/', updateLeave);

export default router;
