import { prisma } from './prisma_init'

export async function find_courses_after_date(date: Date) {
    return await prisma.course.findMany({
    // TODO: Найти все курсы, созданные после указанной даты
    // Вернуть массив курсов
    where: {
        createdAt: {
            gt: date
        }
    }
    })
}