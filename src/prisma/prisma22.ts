import { prisma } from './prisma_init'

export async function find_courses_min_max_average() {
    // TODO: Найти курсы с минимальной и максимальной средней оценкой
    // Использовать обработку в TypeScript (не агрегацию Prisma)
    // Вернуть объект { min: курс, max: курс } с дополнительным полем averageGrade
    const courses = await prisma.course.findMany({
        include: {
            grades: true
        }
    }) as Array<{ id: number; title: string; description: string | null; grades: { grade: number }[] }>;

    const coursesWithAverage = courses.map((course: { id: number; title: string; description: string | null; grades: { grade: number }[] }) => {
        const total = course.grades.reduce((sum: number, g: { grade: number }) => sum + g.grade, 0);
        const count = course.grades.length;
        const average = count > 0 ? total / count : 0;
        return {
            ...course,
            averageGrade: average
        };
    });

    if (coursesWithAverage.length === 0) {
        return { min: null, max: null };
    }

    let minCourse = coursesWithAverage[0];
    let maxCourse = coursesWithAverage[0];
    for (const c of coursesWithAverage) {
        if (c.averageGrade < minCourse.averageGrade) {
            minCourse = c;
        }
        if (c.averageGrade > maxCourse.averageGrade) {
            maxCourse = c;
        }
    }

    return { min: minCourse, max: maxCourse };
}