import todolistDao from '../models/todolistDao';

import todoListProps from '../types/todoListProps';

interface TypeTodoInfo {
	id: number;
	todo: string;
	is_completed: boolean;
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

	return addTodo;
};

const todolistService = {
	addTodoList,
};

export default todolistService;
