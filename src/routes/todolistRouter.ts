import express from 'express';

import todolistController from '../controllers/todolistController';
import validateToken from '../middlewere/validateToken';

const todolistRouter = express.Router();

todolistRouter.post('/', validateToken, todolistController.addTodoList);
todolistRouter.get('/', validateToken, todolistController.getTodoList);

export default todolistRouter;
