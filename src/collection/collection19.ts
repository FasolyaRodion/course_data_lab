/* 
	Создайте функцию getTopAdultUsers, которая возвращает пользователей старше 18 лет с рейтингом выше 4.5, отсортированных по имени.
*/

type User = {
  name: string;
  age: number;
  rating: number;
};

export function getTopAdultUsers(users: User[]): User[] {
	return users
		.filter(user => user.age > 18 && user.rating > 4.5)
		.sort((a, b) => a.name.localeCompare(b.name));
}


