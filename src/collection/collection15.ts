/* 
	Напишите функцию addPrefix, которая принимает массив строк и добавляет к каждой строке префикс "Item: ". Используйте map для создания нового массива.
*/

export function addPrefix(arr: string[]): string[] {
	return arr.map(item => `Item: ${item}`);
}


