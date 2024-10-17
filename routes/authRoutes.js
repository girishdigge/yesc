import express from 'express';
const router = express.Router();
import { login, refresh, logout } from '../controllers/authController.js';
import loginLimiter from '../middleware/loginLimiter.js';

router.post('/', loginLimiter, login);

router.get('/refresh', refresh);
router.post('/logout', logout);
export default router;
