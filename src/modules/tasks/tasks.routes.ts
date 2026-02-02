import { Elysia } from 'elysia'
import { authGuard } from '../../middleware/auth.guard'
import { projectGuard } from '../../middleware/project.guard'
import {
  CalendarQuery,
  CreateProjectTaskBody,
  ListProjectTasksQuery,
  ProjectIdParams,
  TaskIdParams,
  UpdateProjectTaskBody,
} from './tasks.dto'
import {
  createProjectTask,
  deleteProjectTask,
  getBoardData,
  getCalendarTasks,
  listProjectTasks,
  updateProjectTask,
} from './tasks.service'

export const tasksRoutes = new Elysia()
  .use(authGuard)
  .use(projectGuard)

  .get(
    '/projects/:projectId/tasks',
    async ({ params, query }) => {
      return listProjectTasks({ projectId: params.projectId, query })
    },
    { params: ProjectIdParams, query: ListProjectTasksQuery }
  )

  .post(
    '/projects/:projectId/tasks',
    async ({ params, body, userId }) => {
      return createProjectTask({
        projectId: params.projectId,
        body: { ...body, reporterId: userId },
      })
    },
    { params: ProjectIdParams, body: CreateProjectTaskBody }
  )

  .patch(
    '/projects/:projectId/tasks/:taskId',
    async ({ params, body }) => {
      return updateProjectTask({
        projectId: params.projectId,
        taskId: params.taskId,
        body,
      })
    },
    { params: TaskIdParams, body: UpdateProjectTaskBody }
  )

  .delete(
    '/projects/:projectId/tasks/:taskId',
    async ({ params }) => {
      return deleteProjectTask({ projectId: params.projectId, taskId: params.taskId })
    },
    { params: TaskIdParams }
  )

  .get(
    '/projects/:projectId/board',
    async ({ params }) => {
      return getBoardData(params.projectId)
    },
    { params: ProjectIdParams }
  )

  .get(
    '/projects/:projectId/calendar',
    async ({ params, query }) => {
      return getCalendarTasks({ projectId: params.projectId, from: query.from, to: query.to })
    },
    { params: ProjectIdParams, query: CalendarQuery }
  )
