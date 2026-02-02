import { t } from 'elysia'
import { TaskPriority, TaskStatus } from '../../../generated/prisma/client'

export const MyTasksQuery = t.Object({
  search: t.Optional(t.String()),
  status: t.Optional(t.Enum(TaskStatus)),
  priority: t.Optional(t.Enum(TaskPriority)),
})
