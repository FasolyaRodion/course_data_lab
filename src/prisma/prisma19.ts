import { prisma } from './prisma_init'

export async function find_most_popular_course() {
  // TODO: Найти курс с максимальным количеством уникальных студентов
  // Использовать агрегацию средствами Prisma (groupBy)
  // Вернуть объект курса с дополнительным полем studentCount
  const courseCounts = await prisma.grade.groupBy({
    by: ['courseId'],
    _count: { studentId: true },
    orderBy: {
      _count: { studentId: 'desc' }
    },
    take: 1
  }) as Array<{ courseId: number; _count: { studentId: number } }>;

  if (courseCounts.length === 0) {
    return null; // or throw? but test expects a course
  }

  const courseId = courseCounts[0].courseId;
  const studentCount = courseCounts[0]._count.studentId;

  const course = await prisma.course.findUnique({
    where: { id: courseId }
  });

  if (!course) return null;

  return {
    ...course,
    studentCount
  };
}