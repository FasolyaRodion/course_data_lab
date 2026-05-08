import type { Db } from "mongodb"

export class Employee {
    name: string
    salary: number
    department: string
    constructor(name: string, salary: number, department: string) {
        this.name = name
        this.salary = salary
        this.department = department
    }
}

export async function find_high_salary_employees(db: Db, minSalary: number): Promise<Employee[]> {
    // TODO: Найти всех сотрудников с зарплатой больше minSalary
	return await db.collection("employees").find({ salary: { $gt: minSalary } }).toArray() as Employee[]
}