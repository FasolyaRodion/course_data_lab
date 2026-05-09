import { prisma } from './prisma_init'

export interface StudentWithAverage {
    studentId: number
    studentName: string
    averageGrade: number
    gradeCount: number
}

export async function find_top_students(limit: number): Promise<StudentWithAverage[]> {
    const agg = await prisma.grade.groupBy({
        by: ['studentId'] as const,
        _avg: { grade: true },
        _count: { grade: true },
        having: { _count: { grade: { gt: 0 } } },
    }) as Array<{ studentId: number; _avg: { grade: number | null }; _count: { grade: number } }>;

    const sorted = agg
        .filter(g => g._avg.grade !== null)
        .sort((a, b) => (b._avg.grade! - a._avg.grade!))
        .slice(0, limit);

    const studentIds = sorted.map(g => g.studentId);
    const students = await prisma.student.findMany({
        where: { id: { in: studentIds } },
        include: { person: true },
    });

    const studentMap = new Map<number, string>();
    students.forEach((s: { id: number; person: { name: string } }) => {
        studentMap.set(s.id, s.person.name);
    });

    return sorted.map(g => ({
        studentId: g.studentId,
        studentName: studentMap.get(g.studentId) ?? '',
        averageGrade: g._avg.grade!,
        gradeCount: g._count.grade,
    }));
}