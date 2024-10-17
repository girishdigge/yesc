import express from 'express';
import path from 'path';
const __dirname = path.resolve();
const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});
export default router;
