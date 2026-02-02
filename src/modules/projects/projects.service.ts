import { prisma } from '../../db/prisma'

export async function listProjects(userId: string) {
  return prisma.project.findMany({
    where: {
      members: { some: { userId } },
    },
    orderBy: { createdAt: 'desc' },
    include: { members: true },
  })
}

export async function createProject(input: {
  userId: string
  name: string
  description?: string
}) {
  return prisma.project.create({
    data: {
      name: input.name,
      description: input.description,
      ownerId: input.userId,
      members: {
        create: [{ userId: input.userId, role: 'owner' }],
      },
    },
  })
}
