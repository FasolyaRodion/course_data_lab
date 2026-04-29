/* 
	Реализуйте итератор для объекта obj, чтобы при использовании в цикле for...of он возвращал значения свойств объекта, а не ключи.
*/

export const obj = {
	a: 1,
	b: 2,
	c: 3,
	*[Symbol.iterator]() {
		yield* Object.values(this);
	}
};

