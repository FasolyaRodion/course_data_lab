import { prisma } from './prisma_init'

export async function find_courses_with_excellent_students() {
  // TODO: Найти курсы с количеством студентов, имеющих оценку 5 по этому курсу
  // Вернуть массив курсов с дополнительным полем excellentCount
  const excellentCounts = await prisma.grade.groupBy({
    by: ['courseId'] as const,
    where: {
      grade: 5
    },
    _count: {
      studentId: true
    }
  }) as Array<{ courseId: number; _count: { studentId: number } }>;

  const courseIdToCount = new Map<number, number>();
  for (const ec of excellentCounts) {
    courseIdToCount.set(ec.courseId, ec._count.studentId);
  }

  const courses = await prisma.course.findMany() as Array<{ id: number; title: string; description: string | null }>;
  return courses.map((course: { id: number; title: string; description: string | null }) => ({
    ...course,
    excellentCount: courseIdToCount.get(course.id) ?? 0
  }));
}