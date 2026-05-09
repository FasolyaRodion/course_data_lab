import { prisma } from './prisma_init'

export async function delete_students_without_grades() {
  // TODO: Удалить всех студентов, у которых нет ни одной оценки
  // Вернуть количество удаленных студентов
  const result = await prisma.student.deleteMany({ where: { grades: { none: {} } } });
  return result.count;
}