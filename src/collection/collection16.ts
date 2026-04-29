/* 
	Создайте функцию squaresWithIndex, которая принимает массив чисел и возвращает массив объектов с исходным числом, его квадратом и индексом.
*/

export type Result = {num: number, square: number, index: number};

export function squaresWithIndex(numbers: number[]): Result[] {
	return numbers.map((num, index) => ({
		num,
		square: num * num,
		index
	}));
}
