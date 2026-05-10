import { prisma } from './prisma_init'

export async function find_student_progress_by_semester() {
  // TODO: Найти прогресс студентов по семестрам (группировка по месяцу создания оценок)
  // Использовать обработку в TypeScript
  // Вернуть массив с прогрессом по студентам и месяцам
  const grades = await prisma.grade.findMany({
    select: {
      studentId: true,
      grade: true,
      createdAt: true
    }
  });

  const progressMap = new Map<number, Map<string, { sum: number; count: number }>>();

  for (const g of grades) {
    const studentId = g.studentId;
    const month = g.createdAt.toISOString().slice(0, 7); // YYYY-MM

    if (!progressMap.has(studentId)) {
      progressMap.set(studentId, new Map());
    }
    const monthMap = progressMap.get(studentId)!;

    if (!monthMap.has(month)) {
      monthMap.set(month, { sum: 0, count: 0 });
    }
    const monthData = monthMap.get(month)!;
    monthData.sum += g.grade;
    monthData.count += 1;
  }

  const result: any[] = [];
  for (const [studentId, monthMap] of progressMap.entries()) {
    const progressArray = [];
    for (const [month, data] of monthMap.entries()) {
      progressArray.push({
        month,
        averageGrade: data.sum / data.count,
        gradeCount: data.count
      });
    }
    progressArray.sort((a, b) => a.month.localeCompare(b.month));
    result.push({
      studentId,
      progress: progressArray
    });
  }

  result.sort((a, b) => a.studentId - b.studentId);
  return result;
}