import { prisma } from './prisma_init'

export async function find_students_with_most_courses(): Promise<{ studentId: number; person: any; courseCount: number }[]> {
    // TODO: Найти студентов с максимальным количеством уникальных курсов
    // Использовать обработку данных в TypeScript (не агрегацию Prisma)
    // Вернуть массив студентов с информацией о person и количеством курсов
    const grades = await prisma.grade.findMany({
        select: { studentId: true, courseId: true }
    });

    const courseCountPerStudent = new Map<number, Set<number>>();
    for (const g of grades) {
        const set = courseCountPerStudent.get(g.studentId) ?? new Set();
        set.add(g.courseId);
        courseCountPerStudent.set(g.studentId, set);
    }

    let maxCount = 0;
    const counts: Map<number, number> = new Map();
    for (const [studentId, courseSet] of courseCountPerStudent.entries()) {
        const cnt = courseSet.size;
        counts.set(studentId, cnt);
        if (cnt > maxCount) maxCount = cnt;
    }

    if (maxCount === 0) return [];

    const topStudentIds = Array.from(counts.entries())
        .filter(([, cnt]: [number, number]) => cnt === maxCount)
        .map(([studentId]: [number, number]) => studentId);

    const students = await prisma.student.findMany({
        where: { id: { in: topStudentIds } },
        include: { person: true }
    });

    return students.map((s: { id: number; person: any }) => ({
        studentId: s.id,
        person: s.person,
        courseCount: counts.get(s.id) ?? 0
    }));
}