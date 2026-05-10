import { prisma } from './prisma_init'

export async function delete_students_without_person() {
  // TODO: Удалить студентов, у которых нет связанной записи в person
  // Использовать фильтрацию средствами Prisma
  // Вернуть количество удаленных записей
  const result = await prisma.student.deleteMany({
    where: { person: { is: null } }
  });
  return result.count;
}