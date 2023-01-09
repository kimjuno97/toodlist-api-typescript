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
            ) VALUES (?, ?, ?);
        `,
			[userId, todo]
		);

		return await database.query(
			`SELECT id, todo, is_completed
            FROM todolist t
            WHERE t.userId=? AND t.todo=? 
            AND t.is_completed=?`,
			[userId, todo, isCompleted]
		);
	} catch (err) {
		const error = new CustomError('INVALID_DATA_INPUT');
		error.statusCode = 400;
	}
};

const todolistDao = {
	addTodoList,
};

export default todolistDao;
