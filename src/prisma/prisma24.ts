import { prisma } from './prisma_init'

export async function find_students_with_all_courses() {
  // TODO: Найти студентов, у которых есть оценки по всем существующим курсам
  // Использовать обработку в TypeScript
  // Вернуть массив студентов с информацией о person
  const courses = await prisma.course.findMany({
    select: { id: true }
  }) as { id: number }[]
  const allCourseIds = new Set<number>(courses.map(c => c.id))

  if (allCourseIds.size === 0) {
    return []
  }

  const grades = await prisma.grade.findMany({
    select: { studentId: true, courseId: true }
  }) as { studentId: number; courseId: number }[]

  const studentCourseMap = new Map<number, Set<number>>()
  for (const g of grades) {
    const set = studentCourseMap.get(g.studentId) ?? new Set<number>()
    set.add(g.courseId)
    studentCourseMap.set(g.studentId, set)
  }

  const studentIdsWithAllCourses: number[] = []
  for (const [studentId, courseSet] of studentCourseMap.entries()) {
    let hasAll = true
    for (const cid of allCourseIds) {
      if (!courseSet.has(cid)) {
        hasAll = false
        break
      }
    }
    if (hasAll) {
      studentIdsWithAllCourses.push(studentId)
    }
  }

  const students = await prisma.student.findMany({
    where: { id: { in: studentIdsWithAllCourses } },
    include: { person: true }
  }) as { id: number; person: any }[]

  return students.map(s => ({
    id: s.id,
    person: s.person
  }))
}