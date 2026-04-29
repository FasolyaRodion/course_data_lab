/* 	
	Напишите функцию groupUnfinishedHighPriorityTasks, которая группирует задачи по категориям, фильтруя только незавершенные высокоприоритетные задачи.
*/

export type Task = { category: string; priority: string; completed: boolean };

export function groupUnfinishedHighPriorityTasks(tasks: Task[]): Map<string, Task[]> {
	const map = new Map<string, Task[]>();
	tasks
		.filter(task => !task.completed && task.priority.toLowerCase() === 'high')
		.forEach(task => {
			const group = map.get(task.category) || [];
			group.push(task);
			map.set(task.category, group);
		});
	return map;
}


