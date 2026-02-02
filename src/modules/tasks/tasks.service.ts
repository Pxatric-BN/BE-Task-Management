import { TaskPriority, TaskStatus } from '../../../generated/prisma/client'
import { prisma } from '../../db/prisma'

export async function listProjectTasks(args: {
  projectId: string
  query: {
    search?: string
    status?: TaskStatus
    priority?: TaskPriority
    assigneeId?: string
    reporterId?: string
    sortBy?: 'createdAt' | 'dueDate' | 'position'
    sortOrder?: 'asc' | 'desc'
  }
}) {
  const { projectId, query } = args
  const search = query.search?.trim()

  return prisma.task.findMany({
    where: {
      projectId,
      ...(query.status ? { status: query.status } : {}),
      ...(query.priority ? { priority: query.priority } : {}),
      ...(query.assigneeId ? { assigneeId: query.assigneeId } : {}),
      ...(query.reporterId ? { reporterId: query.reporterId } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy:
      query.sortBy === 'dueDate'
        ? { dueDate: query.sortOrder ?? 'asc' }
        : query.sortBy === 'position'
          ? { position: query.sortOrder ?? 'asc' }
          : { createdAt: 'desc' },
    include: {
      assignee: true,
      reporter: true,
      tags: { include: { tag: true } },
    },
  })
}

export async function createProjectTask(args: {
  projectId: string
  body: {
    title: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    dueDate: string
    assigneeId?: string
    reporterId: string // ✅ บังคับ
    progress?: number
    position?: number
  }
}) {
  const reporterId = args.body.reporterId
  if (!reporterId) throw new Error('Unauthorized') // กันหลุดแบบปลอดภัย

  return prisma.task.create({
    data: {
      projectId: args.projectId,
      title: args.body.title,
      description: args.body.description,
      status: args.body.status ?? TaskStatus.pending,
      priority: args.body.priority ?? TaskPriority.medium,
      dueDate: new Date(args.body.dueDate),

      reporterId,
      assigneeId: args.body.assigneeId,

      progress: args.body.progress ?? 0,
      position: args.body.position ?? 1000,
    },
  })
}


export async function updateProjectTask(args: {
  projectId: string
  taskId: string
  body: {
    title?: string
    description?: string | null
    status?: TaskStatus
    priority?: TaskPriority
    dueDate?: string
    assigneeId?: string | null
    reporterId?: string | null
    progress?: number
    position?: number
  }
}) {
  const exists = await prisma.task.findFirst({
    where: { id: args.taskId, projectId: args.projectId },
  })
  if (!exists) throw new Error('Task not found in this project')

  return prisma.task.update({
    where: { id: args.taskId },
    data: {
      ...(args.body.title !== undefined ? { title: args.body.title } : {}),
      ...(args.body.description !== undefined ? { description: args.body.description ?? null } : {}),
      ...(args.body.status !== undefined ? { status: args.body.status } : {}),
      ...(args.body.priority !== undefined ? { priority: args.body.priority } : {}),
      ...(args.body.dueDate !== undefined ? { dueDate: new Date(args.body.dueDate) } : {}),
      ...(args.body.assigneeId !== undefined ? { assigneeId: args.body.assigneeId ?? null } : {}),
      ...(args.body.reporterId !== undefined ? { reporterId: args.body.reporterId ?? null } : {}),
      ...(args.body.progress !== undefined ? { progress: args.body.progress } : {}),
      ...(args.body.position !== undefined ? { position: args.body.position } : {}),
    },
  })
}

export async function deleteProjectTask(args: { projectId: string; taskId: string }) {
  const exists = await prisma.task.findFirst({
    where: { id: args.taskId, projectId: args.projectId },
  })
  if (!exists) throw new Error('Task not found in this project')

  await prisma.task.delete({ where: { id: args.taskId } })
  return { ok: true }
}

export async function getBoardData(projectId: string) {
  const tasks = await prisma.task.findMany({
    where: { projectId },
    orderBy: [{ status: 'asc' }, { position: 'asc' }],
    include: { assignee: true, reporter: true, tags: { include: { tag: true } } },
  })

  return {
    pending: tasks.filter((t) => t.status === 'pending'),
    in_progress: tasks.filter((t) => t.status === 'in_progress'),
    done: tasks.filter((t) => t.status === 'done'),
  }
}

export async function getCalendarTasks(args: { projectId: string; from?: string; to?: string }) {
  const from = args.from ? new Date(args.from) : new Date('1970-01-01')
  const to = args.to ? new Date(args.to) : new Date('2100-01-01')

  return prisma.task.findMany({
    where: {
      projectId: args.projectId,
      dueDate: { gte: from, lte: to },
    },
    orderBy: { dueDate: 'asc' },
  })
}
