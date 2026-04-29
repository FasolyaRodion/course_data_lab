/* 
	Напишите функцию getNames, которая принимает массив объектов пользователей и возвращает массив их имен. Используйте map для этого.
*/

export type User = {
  name: string;
}

export function getNames(users: User[]): string[] {
	return users.map(user => user.name);
}

