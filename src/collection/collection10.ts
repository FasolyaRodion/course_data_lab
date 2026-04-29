/* 
	Создайте функцию invertMap, которая принимает Map и возвращает новый Map, где ключи и значения поменяны местами.
*/

export function invertMap<K, V>(map: Map<K, V>): Map<V, K> {
	const newMap = new Map<V, K>();
	for (const [key, value] of map) {
		newMap.set(value, key);
	}
	return newMap;
}
