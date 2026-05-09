import { prisma } from "./prisma_init";

export async function update_student_email(
  studentId: number,
  newEmail: string
) {
  // TODO: Обновить email студента по его ID
  // Вернуть обновленного студента с информацией о person
  return await prisma.student.update({
    where: { id: studentId },
    data: { person: { update: { email: newEmail } } },
    include: { person: true }
  });
}
