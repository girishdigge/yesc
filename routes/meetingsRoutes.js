import express from 'express';
import {
  getAllMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting,
  getTotalMeetingsCount,
} from '../controllers/meetingsController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();
router.use(verifyJWT);

router.get('/count', getTotalMeetingsCount);
router.get('/:id', getMeetingById);
router.delete('/delete', deleteMeeting);
router.get('/', getAllMeetings);
router.post('/', createMeeting);
router.patch('/', updateMeeting);

export default router;
