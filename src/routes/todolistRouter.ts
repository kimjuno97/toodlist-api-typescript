import express from 'express';

import todolistController from '../controllers/todolistController';
import validateToken from '../middlewere/validateToken';

const todolistRouter = express.Router();

todolistRouter.post('/todo', validateToken, todolistController.addTodoList);

export default todolistRouter;
