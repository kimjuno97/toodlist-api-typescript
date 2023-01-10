import express from 'express';

import todolistController from '../controllers/todolistController';
import validateToken from '../middlewere/validateToken';

const todolistRouter = express.Router();

todolistRouter.post('/', validateToken, todolistController.addTodoList);
todolistRouter.get('/', validateToken, todolistController.getTodoList);
todolistRouter.put('/', validateToken, todolistController.updateTodo);
todolistRouter.delete('/:id', validateToken, todolistController.deleteTodo);

export default todolistRouter;
