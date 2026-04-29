/* 
	Напишите генераторную функцию infiniteSequence, которая создает бесконечную последовательность чисел, начиная с 0 и увеличиваясь на 1 с каждой итерацией.
*/

export function* infiniteSequence(): IterableIterator<number> {
	let i = 0;
	while (true) {
		yield i++;
	}
}
