import { Elysia } from 'elysia'
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

  // ✅ List + filter/sort/search
  .get(
    '/projects/:projectId/tasks',
    async ({ params, query }) => {
      return listProjectTasks({ projectId: params.projectId, query })
    },
    { params: ProjectIdParams, query: ListProjectTasksQuery }
  )

  // ✅ Create
  .post(
    '/projects/:projectId/tasks',
    async ({ params, body }) => {
      return createProjectTask({ projectId: params.projectId, body })
    },
    { params: ProjectIdParams, body: CreateProjectTaskBody }
  )

  // ✅ Update
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

  // ✅ Delete
  .delete(
    '/projects/:projectId/tasks/:taskId',
    async ({ params }) => {
      return deleteProjectTask({ projectId: params.projectId, taskId: params.taskId })
    },
    { params: TaskIdParams }
  )

  // ✅ Board
  .get(
    '/projects/:projectId/board',
    async ({ params }) => {
      return getBoardData(params.projectId)
    },
    { params: ProjectIdParams }
  )

  // ✅ Calendar
  .get(
    '/projects/:projectId/calendar',
    async ({ params, query }) => {
      return getCalendarTasks({ projectId: params.projectId, from: query.from, to: query.to })
    },
    { params: ProjectIdParams, query: CalendarQuery }
  )
