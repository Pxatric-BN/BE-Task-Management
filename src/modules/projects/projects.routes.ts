import { Elysia } from 'elysia'
import { CreateProjectBody } from './projects.dto'
import { createProject, listProjects } from './projects.service'

export const projectsRoutes = new Elysia({ prefix: '/projects' })
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
