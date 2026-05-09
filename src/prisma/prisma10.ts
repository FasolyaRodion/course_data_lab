import { prisma } from './prisma_init'

export async function get_course_average_grade(courseTitle: string): Promise<number | null> {
  const course = await prisma.course.findUnique({
    where: { title: courseTitle }
  });
  if (!course) return null;
  const average = await prisma.grade.avg({
    where: { courseId: course.id }
  });
  return average;
}