import { Elysia } from 'elysia'
import { authGuard } from '../../middleware/auth.guard'
import { MyTasksQuery } from './me.dto'
import { listMyTasks } from './me.service'

export const meRoutes = new Elysia({ prefix: '/me' })
  .use(authGuard)

  .get(
    '/tasks',
    async ({ userId, query }) => {
      return listMyTasks(userId, query)
    },
    { query: MyTasksQuery }
  )
