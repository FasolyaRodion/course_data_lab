import { prisma } from './prisma_init'

export async function find_students_by_name_pattern(pattern: string) {
    return await prisma.student.findMany({
    // TODO: Найти всех студентов, у которых имя содержит указанную подстроку
    // Вернуть массив студентов с включенной информацией о person
    where: {
        person: {
            name: {
                contains: pattern
            }
        }
    },
    include: {
        person: true
    }
    })
}