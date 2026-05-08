import type { Db } from "mongodb"

export class Customer {
    name: string
    email: string
    phone?: string
    address?: string
    constructor(name: string, email: string, phone?: string, address?: string) {
        this.name = name
        this.email = email
        this.phone = phone
        this.address = address
    }
}

export async function find_customers_with_phone(db: Db): Promise<Customer[]> {
    // TODO: Найти всех клиентов, у которых указан телефонный номер
	return (await db.collection("customers").find({ phone: { $exists: true } }).toArray()) as any as Customer[]
}


