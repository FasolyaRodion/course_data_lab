import { prisma } from './prisma_init'

export async function find_top_courses(limit: number) {
    // TODO: Найти топ N курсов по средней оценке
    // Для каждого курса вычислить среднюю оценку из всех его оценок
    // Вернуть массив с id курса, названием и средней оценкой
    // Отсортировать по убыванию средней оценки
    // Использовать вычисление средней оценки в TypeScript коде (не через агрегацию Prisma)
    const courses = await prisma.course.findMany({
        include: {
            grades: true
        }
    }) as Array<{ id: number; title: string; grades: { grade: number }[] }>;

    const coursesWithAverage = courses.map((course: { id: number; title: string; grades: { grade: number }[] }) => {
        const total = course.grades.reduce((sum: number, g: { grade: number }) => sum + g.grade, 0);
        const count = course.grades.length;
        const average = count > 0 ? total / count : 0;
        return {
            id: course.id,
            title: course.title,
            averageGrade: average
        };
    });

    return coursesWithAverage
        .sort((a: { averageGrade: number }, b: { averageGrade: number }) => b.averageGrade - a.averageGrade)
        .slice(0, limit);
}