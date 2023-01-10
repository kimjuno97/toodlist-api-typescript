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

const getTodoList = async (userId: number) => {
	const todoList = await todolistDao.getTodoList(userId);

	return todoList.map(({ id, todo, is_completed }: TypeTodoInfo) => ({
		id,
		todo,
		isCompleted: is_completed === 0 ? false : true,
	}));
};

const todolistService = {
	addTodoList,
	getTodoList,
};

export default todolistService;
