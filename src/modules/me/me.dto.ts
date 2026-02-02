import { t } from 'elysia'
import { TaskPriority, TaskStatus } from '../../../generated/prisma/client'

export const MyTasksQuery = t.Object({
  userId: t.Optional(t.String()), // ชั่วคราว: auth ยังไม่มา
  search: t.Optional(t.String()),
  status: t.Optional(t.Enum(TaskStatus)),
  priority: t.Optional(t.Enum(TaskPriority)),
})
