import { prisma } from './prisma_init'

export interface CourseWithStudentCount {
    id: number
    title: string
    description: string | null
    studentCount: number
}

export async function find_courses_with_student_count(): Promise<CourseWithStudentCount[]> {
    const groupByResult = await prisma.grade.groupBy({
      by: ['courseId'] as const,
      _count: { studentId: true },
    }) as Array<{ courseId: number; _count: { studentId: number } }>;

    const countMap = new Map<number, number>();
    groupByResult.forEach(g => {
      countMap.set(g.courseId, g._count.studentId);
    });

    const courses = await prisma.course.findMany();
    return courses.map((c: { id: number; title: string; description: string | null }) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      studentCount: countMap.get(c.id) ?? 0,
    }));
}