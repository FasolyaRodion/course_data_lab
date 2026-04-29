/* 
	Напишите функцию getOrderStats, которая принимает массив заказов и возвращает объект с общей суммой, количеством и средним чеком только завершенных заказов (status: 'completed').
*/

type Order = {status: string, amount: number}
type Stats = {total: number, count: number, average: number}

export function getOrderStats(orders: Order[]): Stats {
	const completedOrders = orders.filter(order => order.status === 'completed');
	const total = completedOrders.reduce((sum, order) => sum + order.amount, 0);
	const count = completedOrders.length;
	const average = count > 0 ? total / count : 0;

	return { total, count, average };
}
