import type { Db } from "mongodb"

export class Student {
    name: string
    grade: string
    gpa: number
    constructor(name: string, grade: string, gpa: number) {
        this.name = name
        this.grade = grade
        this.gpa = gpa
    }
}

export async function find_students_by_grade(db: Db, grade: string): Promise<Student[]> {
    // TODO: Найти всех студентов с указанным классом
	return await db.collection("students").find({ grade }).toArray() as Student[]
}