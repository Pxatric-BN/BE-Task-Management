import { t } from 'elysia'

export const CreateProjectBody = t.Object({
  name: t.String({ minLength: 1, maxLength: 120 }),
  description: t.Optional(t.String({ maxLength: 1000 })),
})

export const ProjectIdParams = t.Object({
  projectId: t.String(),
})
