import { prisma } from './prisma_init'

export async function find_students_above_course_average(courseTitle: string): Promise<{ studentId: number; studentName: string; grade: number }[]> {
  // TODO: Найти студентов, у которых есть оценки по указанному курсу выше среднего балла по этому курсу
  // Вернуть массив студентов с информацией о person и их оценкой
  // Использовать два отдельных запроса: первый для нахождения среднего балла, второй для поиска студентов
  const courses = await prisma.course.findMany({
    where: { title: courseTitle }
  });
  if (!courses || courses.length === 0) {
    return [];
  }
  const courseId = courses[0].id;

  // Запрос среднего балла по курсу
  const courseAgg = await prisma.grade.groupBy({
    by: ['courseId'],
    _avg: { grade: true },
  }) as Array<{ courseId: number; _avg: { grade: number | null } }>;

  const courseAvg = courseAgg?.find(a => a.courseId === courseId)?._avg?.grade ?? 0;

  if (courseAvg === null || courseAvg === undefined) {
    return [];
  }

  // Поиск студентов с оценками выше среднего
  const students = await prisma.grade.findMany({
    where: {
      courseId: courseId,
      grade: { gt: courseAvg }
    },
    include: { student: { include: { person: true } } }
  }) as Array<{
    studentId: number;
    grade: number;
    student: { person: { name: string } };
  }>;

  return students.map(s => ({
    studentId: s.studentId,
    studentName: s.student.person.name,
    grade: s.grade
  }));
}