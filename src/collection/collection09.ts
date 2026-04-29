/* 
	Напишите функцию findIntersection, которая принимает два массива и возвращает массив их общих элементов, используя Set.
*/

export function findIntersection(arr1: number[], arr2: number[]): number[] {
	const set1 = new Set(arr1);
	const intersection = arr2.filter(item => set1.has(item));
	return Array.from(new Set(intersection));
}
