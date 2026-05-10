import { prisma } from './prisma_init'

export async function find_oldest_and_newest_students() {
  // TODO: Найти самого старого и самого нового студента по дате создания
  // Вернуть объект { oldest: студент, newest: студент } с информацией о person
  const students = await prisma.student.findMany({
    orderBy: { createdAt: 'asc' },
    include: { person: true }
  });

  if (students.length === 0) {
    return { oldest: null, newest: null };
  }

  const oldest = students[0];
  const newest = students[students.length - 1];

  return { oldest, newest };
}