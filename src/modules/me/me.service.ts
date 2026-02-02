import { TaskPriority, TaskStatus } from '../../../generated/prisma/client'
import { prisma } from '../../db/prisma'
import { getMockUserId } from '../projects/projects.service'

export async function listMyTasks(query: {
  userId?: string
  search?: string
  status?: TaskStatus
  priority?: TaskPriority
}) {
  const me = query.userId ?? (await getMockUserId())
  if (!me) throw new Error('No user found. Seed users first.')

  const search = query.search?.trim()

  return prisma.task.findMany({
    where: {
      assigneeId: me,
      ...(query.status ? { status: query.status } : {}),
      ...(query.priority ? { priority: query.priority } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy: { dueDate: 'asc' },
    include: { project: true, reporter: true, assignee: true },
  })
}
