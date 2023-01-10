import database from './dataSource';
import CustomError from '../types/CustomError';
import todoListProps from '../types/todoListProps';

const addTodoList = async ({ userId, todo, isCompleted }: todoListProps) => {
	try {
		await database.query(
			`
            INSERT INTO todolist (
                user_id,
                todo,
                is_completed
                ) VALUES (?, ?, ?);
                `,
			[userId, todo, isCompleted]
		);

		return await database.query(
			`SELECT id, todo, is_completed
            FROM todolist t
            WHERE t.user_id=? AND t.todo=? 
            AND t.is_completed=?`,
			[userId, todo, isCompleted]
		);
	} catch (err) {
		const error = new CustomError('INVALID_DATA_INPUT');
		error.statusCode = 400;
	}
};

const getTodoList = async (userId: number) => {
	try {
		return await database.query(
			`SELECT id, todo, is_completed
			FROM todolist
			WHERE todolist.user_id='${userId}'`
		);
	} catch (err) {
		const error = new CustomError('INVALID_DATA_INPUT');
		error.statusCode = 400;
	}
};

const updateTodo = async ({ id, userId, todo, isCompleted }: todoListProps) => {
	try {
		await database.query(
			`UPDATE todolist SET todo=?,
			is_completed=?
			WHERE id=? AND user_id=?`,
			[todo, isCompleted, id, userId]
		);
	} catch (err) {
		const error = new CustomError('INVALID_DATA_INPUT');
		error.statusCode = 400;
	}
};

const todolistDao = {
	addTodoList,
	getTodoList,
	updateTodo,
};

export default todolistDao;
