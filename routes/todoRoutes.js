import express from 'express';
// import path from 'path';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getTotalTodosCount,
} from '../controllers/todosController.js';
import verifyJWT from '../middleware/verifyJWT.js';
const router = express.Router();
router.use(verifyJWT);

router.get('/count', getTotalTodosCount);
router.get('/:id', getTodoById);
router.delete('/delete', deleteTodo);
router.get('/', getAllTodos);
router.post('/', createTodo);
router.patch('/', updateTodo);

export default router;
