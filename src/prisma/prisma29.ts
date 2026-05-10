import { prisma } from './prisma_init'

export async function find_students_with_same_names() {
  // TODO: Найти студентов с одинаковыми именами
  // Использовать обработку в TypeScript
  // Вернуть массив групп студентов с одинаковыми именами
  const students = await prisma.student.findMany({
    include: { person: true }
  });

  const groups = new Map<string, any[]>();
  for (const s of students) {
    const name = s.person.name;
    const group = groups.get(name) ?? [];
    group.push(s);
    groups.set(name, group);
  }

  const result: any[][] = [];
  for (const [name, group] of groups.entries()) {
    if (group.length > 1) {
      result.push(group);
    }
  }
  return result;
}