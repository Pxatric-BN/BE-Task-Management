import { Elysia } from 'elysia'
import { CreateProjectBody } from './projects.dto'
import { createProject, listProjects } from './projects.service'
import { authGuard } from '../../middleware/auth.guard'

export const projectsRoutes = new Elysia({ prefix: '/projects' })
  .use(authGuard)
  .get('/', async () => {
    return listProjects()
  })
  .post(
    '/',
    async ({ body }) => {
      return createProject(body)
    },
    { body: CreateProjectBody }
  )
