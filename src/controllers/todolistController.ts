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
		const { limit, offset } = req.query;
		const { userId } = req.body;

		if (typeof limit === 'string' && typeof offset === 'string') {
			const todoList = await todolistService.getTodoList({
				userId,
				limit,
				offset,
			});

			return res.status(201).json({ todo: todoList });
		}
	} catch (err) {
		if (err instanceof CustomError) {
			return res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
};

const updateTodo = async (req: Request, res: Response) => {
	try {
		const { id, userId, todo, isCompleted } = req.body;
		await todolistService.updateTodo({ id, userId, todo, isCompleted });

		return res.status(201).json({ message: 'SUCCESS_UPDATE' });
	} catch (err) {
		if (err instanceof CustomError) {
			return res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
};

const deleteTodo = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await todolistService.deleteTodo(parseInt(id));

		return res.status(201).json({ message: 'SUCCESS_DELETE' });
	} catch (err) {
		if (err instanceof CustomError) {
			return res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
};

const todolistController = {
	addTodoList,
	getTodoList,
	updateTodo,
	deleteTodo,
};

export default todolistController;
