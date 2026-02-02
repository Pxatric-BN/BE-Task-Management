import { t } from 'elysia'
import { TaskPriority, TaskStatus } from '../../../generated/prisma/client'

export const TaskIdParams = t.Object({
  projectId: t.String(),
  taskId: t.String(),
})

export const ProjectIdParams = t.Object({
  projectId: t.String(),
})

export const ListProjectTasksQuery = t.Object({
  search: t.Optional(t.String()),
  status: t.Optional(t.Enum(TaskStatus)),       // pending | in_progress | done (underscore ✅)
  priority: t.Optional(t.Enum(TaskPriority)),   // low | medium | high
  assigneeId: t.Optional(t.String()),
  reporterId: t.Optional(t.String()),
  sortBy: t.Optional(t.Union([t.Literal('createdAt'), t.Literal('dueDate'), t.Literal('position')])),
  sortOrder: t.Optional(t.Union([t.Literal('asc'), t.Literal('desc')])),
})

export const CreateProjectTaskBody = t.Object({
  title: t.String({ minLength: 1, maxLength: 200 }),
  description: t.Optional(t.String({ maxLength: 5000 })),
  status: t.Optional(t.Enum(TaskStatus)),
  priority: t.Optional(t.Enum(TaskPriority)),
  dueDate: t.String(), // ISO string (เพราะ dueDate ใน schema เดิม required)
  assigneeId: t.Optional(t.String()),
  reporterId: t.Optional(t.String()), // ชั่วคราว
  progress: t.Optional(t.Integer({ minimum: 0, maximum: 100 })),
  position: t.Optional(t.Integer({ minimum: 0 })),
})

export const UpdateProjectTaskBody = t.Partial(
  t.Object({
    title: t.String({ minLength: 1, maxLength: 200 }),
    description: t.Optional(t.String({ maxLength: 5000 })),
    status: t.Enum(TaskStatus),
    priority: t.Enum(TaskPriority),
    dueDate: t.String(),
    assigneeId: t.Optional(t.String()),
    reporterId: t.Optional(t.String()),
    progress: t.Integer({ minimum: 0, maximum: 100 }),
    position: t.Integer({ minimum: 0 }),
  })
)

export const CalendarQuery = t.Object({
  from: t.Optional(t.String()), // YYYY-MM-DD หรือ ISO
  to: t.Optional(t.String()),
})
