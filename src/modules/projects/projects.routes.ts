import { Elysia } from 'elysia'
import { authGuard } from '../../middleware/auth.guard'
import { CreateProjectBody } from './projects.dto'
import { createProject, listProjects } from './projects.service'

export const projectsRoutes = new Elysia({ prefix: '/projects' })
  .use(authGuard)

  .get('/', async ({ userId }) => {
    return listProjects(userId)
  })

  .post(
    '/',
    async ({ body, userId }) => {
      return createProject({ userId, ...body })
    },
    { body: CreateProjectBody }
  )
