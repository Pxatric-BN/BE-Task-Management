import { TaskPriority, TaskStatus } from '../../../generated/prisma/client'
import { prisma } from '../../db/prisma'

export async function listMyTasks(userId: string, query: {
  search?: string
  status?: TaskStatus
  priority?: TaskPriority
}) {
  const search = query.search?.trim()

  return prisma.task.findMany({
    where: {
      assigneeId: userId,
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
