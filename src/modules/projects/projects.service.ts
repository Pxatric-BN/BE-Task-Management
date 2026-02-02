import { prisma } from '../../db/prisma'

/** ชั่วคราว: ถ้ายังไม่มี auth ให้ใช้ user คนแรกใน DB */
export async function getMockUserId(): Promise<string | null> {
  const user = await prisma.user.findFirst({ orderBy: { createdAt: 'asc' } })
  return user?.id ?? null
}

export async function listProjects() {
  // TODO: filter projects by membership when auth is ready
  return prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: { members: true },
  })
}

export async function createProject(input: {
  name: string
  description?: string
  ownerId?: string
}) {
  const ownerId = input.ownerId ?? (await getMockUserId())
  if (!ownerId) throw new Error('No user found. Seed users first.')

  return prisma.project.create({
    data: {
      name: input.name,
      description: input.description,
      ownerId,
      members: {
        create: [{ userId: ownerId, role: 'owner' }],
      },
    },
  })
}
