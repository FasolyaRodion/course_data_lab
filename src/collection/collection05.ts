/* 
	Реализуйте генераторную функцию range, которая принимает начальное и конечное числа и возвращает генератор, yielding все числа в этом диапазоне включительно.
*/

export function* range(from: number, to: number) {
	for (let i = from; i <= to; i++) {
		yield i;
	}
}
