/* 
	Напишите функцию calculateTotalProgress, которая вычисляет общий прогресс пользователей, учитывая только активных и с прогрессом > 50%.
*/

type User = {active: boolean, progress: number}

export function calculateTotalProgress(users: User[]): number {
	const filtered = users.filter(user => user.active && user.progress > 50);
	if (filtered.length === 0) return 0;
	return filtered.reduce((total, user) => total + user.progress, 0) / filtered.length;
}