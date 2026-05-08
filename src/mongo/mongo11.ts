import type { Db } from "mongodb"

export class Course {
    title: string
    department: string
    credits: number
    constructor(title: string, department: string, credits: number) {
        this.title = title
        this.department = department
        this.credits = credits
    }
}

export async function find_courses_in_departments(db: Db, departments: string[]): Promise<Course[]> {
    // TODO: Найти все курсы, принадлежащие любому из указанных отделов
	return (await db.collection("courses").find({ department: { $in: departments } }).toArray()) as any as Course[]
}