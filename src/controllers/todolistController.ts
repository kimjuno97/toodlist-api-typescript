import { Request, Response, NextFunction } from 'express';
import CustomError from '../types/CustomError';
import AuthRequest from '../types/AuthRequest';
import todolistService from '../services/todolistService';

const addTodoList = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { todo, isCompleted } = req.body;
		const { userId } = req.user;
		if (!todo) {
			return res.status(400).json({ message: 'MISSING_TODO_VALUE' });
		}

		const todoInfo = todolistService.addTodoList({ userId, todo, isCompleted });

		return res.status(201).json({
			todo: todoInfo,
		});
	} catch (err) {
		if (err instanceof CustomError) {
			return res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
};

const todolistController = {
	addTodoList,
};

export default todolistController;
