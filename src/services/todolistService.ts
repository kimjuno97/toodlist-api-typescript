import todolistDao from '../models/todolistDao';

import todoListProps from '../types/todoListProps';

interface TypeTodoInfo {
	id: number;
	todo: string;
	is_completed: number | boolean;
}

const addTodoList = async ({
	userId,
	todo,
	isCompleted = false,
}: todoListProps) => {
	const [addTodo]: TypeTodoInfo[] = await todolistDao.addTodoList({
		userId,
		todo,
		isCompleted,
	});

	{
		let { id, todo, is_completed } = addTodo;
		if (addTodo.is_completed === 0) {
			is_completed = false;
		} else {
			is_completed = true;
		}
		return { id, todo, isCompleted: is_completed };
	}
};

const getTodoList = async ({
	userId,
	limit = '5',
	offset = '0',
}: {
	userId: number;
	limit: string;
	offset: string;
}) => {
	console.log('limit,offet', limit, offset);
	const todoList = await todolistDao.getTodoList({
		userId,
		limit,
		offset,
	});

	return todoList.map(({ id, todo, is_completed }: TypeTodoInfo) => ({
		id,
		todo,
		isCompleted: is_completed === 0 ? false : true,
	}));
};

const updateTodo = async ({ id, userId, todo, isCompleted }: todoListProps) => {
	await todolistDao.updateTodo({ id, userId, todo, isCompleted });
};

const deleteTodo = async (id: number) => {
	await todolistDao.deleteTodo(id);
};

const todolistService = {
	addTodoList,
	getTodoList,
	updateTodo,
	deleteTodo,
};

export default todolistService;
