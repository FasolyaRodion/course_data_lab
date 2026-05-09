import { prisma } from './prisma_init'

export async function find_students_with_excellent_grades() {
  // TODO: Найти всех студентов, у которых есть хотя бы одна оценка 5
  // Использовать обработку данных в TypeScript (не фильтрацию Prisma)
  // Вернуть массив студентов с информацией о person
  const allGrades = await prisma.grade.findMany({
    select: { studentId: true, grade: true }
  });

  const excellentStudentIds = [...new Set(
    allGrades
      .filter((g: { grade: number }) => g.grade === 5)
      .map((g: { studentId: number }) => g.studentId)
  )];

  const students = await prisma.student.findMany({
    where: { id: { in: excellentStudentIds } },
    include: { person: true }
  });

  return students;
}