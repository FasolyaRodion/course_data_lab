import { prisma } from './prisma_init'

export async function update_students_email_domain(oldDomain: string, newDomain: string): Promise<number> {
    const students = await prisma.student.findMany({
        include: { person: true },
        where: { person: { email: { endsWith: oldDomain } } }
    });
    let count = 0;
    for (const student of students) {
        const newEmail = student.person.email.replace(oldDomain, newDomain);
        await prisma.student.update({
            where: { id: student.id },
            data: { person: { update: { email: newEmail } } }
        });
        count++;
    }
    return count;
}