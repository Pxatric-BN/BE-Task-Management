import { Elysia } from 'elysia'
import { MyTasksQuery } from './me.dto'
import { listMyTasks } from './me.service'

export const meRoutes = new Elysia({ prefix: '/me' })
  .get(
    '/tasks',
    async ({ query }) => {
      return listMyTasks(query)
    },
    { query: MyTasksQuery }
  )
