import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

import { projectsRoutes } from './modules/projects/projects.routes'
import { tasksRoutes } from './modules/tasks/tasks.routes'
import { meRoutes } from './modules/me/me.routes'

export const app = new Elysia()
  .use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
  )
  // health check
  .get('/health', () => ({ ok: true }))

  // routes
  .use(projectsRoutes)
  .use(tasksRoutes)
  .use(meRoutes)
