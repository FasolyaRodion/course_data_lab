/* 
	Создайте функцию findMaxWithCondition, которая находит объект с максимальным значением свойства, но только среди элементов, удовлетворяющих условию фильтра, в противном случае возвращает null.
*/

export function findMaxWithCondition<T>(
	array: T[], 
	propertyName: keyof T,
	condition: (item: T) => boolean): T | null {
	const filtered = array.filter(condition);
	if (filtered.length === 0) return null;

	return filtered.reduce((max, current) => {
		const currentVal = current[propertyName] as unknown as number;
		const maxVal = max[propertyName] as unknown as number;
		return currentVal > maxVal ? current : max;
	});
}


