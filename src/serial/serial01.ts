/* 	 
	Дан класс Order и сериализованные данные. Добавьте правильный декоратор к полю customer, чтобы метод getOrderInfo() работал.
*/

import "reflect-metadata";
import { Type } from "class-transformer";
import { User } from "./user";

export class Order {
  id: number;
  product: string;

  @Type(() => User)
  customer: User; // Требует декоратора

  constructor(
    id: number,
    product: string,
    firstName: string,
    lastName: string
  ) {
    this.id = id;
    this.product = product;
    this.customer = new User(firstName, lastName);
  }

  getOrderInfo() {
    return `Order #${this.id} by ${this.customer.getFullName()}`;
  }
}


