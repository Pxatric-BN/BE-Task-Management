import { Elysia } from 'elysia'
import { MyTasksQuery } from './me.dto'
import { listMyTasks } from './me.service'
import { authGuard } from '../../middleware/auth.guard'

export const meRoutes = new Elysia({ prefix: '/me' })
  .use(authGuard)
  .get(
    '/tasks',
    async ({ query }) => {
      return listMyTasks(query)
    },
    { query: MyTasksQuery }
  )
