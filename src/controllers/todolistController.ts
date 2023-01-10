import { Request, Response, NextFunction } from 'express';
import CustomError from '../types/CustomError';
import todolistService from '../services/todolistService';

const addTodoList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId, todo, isCompleted } = req.body;

		if (!todo) {
			return res.status(400).json({ message: 'MISSING_TODO_VALUE' });
		}

		const todoInfo = await todolistService.addTodoList({
			userId,
			todo,
			isCompleted,
		});

		return res.status(201).json({
			todo: todoInfo,
		});
	} catch (err) {
		if (err instanceof CustomError) {
			return res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
};

const getTodoList = async (req: Request, res: Response) => {
	try {
		const { userId } = req.body;

		const todoList = await todolistService.getTodoList(userId);

		return res.status(201).json({ todo: todoList });
	} catch (err) {
		if (err instanceof CustomError) {
			return res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
};

const todolistController = {
	addTodoList,
	getTodoList,
};

export default todolistController;
