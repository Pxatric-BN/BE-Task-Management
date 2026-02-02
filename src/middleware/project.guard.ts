import { Elysia } from 'elysia'
import { prisma } from '../db/prisma'
import { authGuard } from './auth.guard'

export const projectGuard = new Elysia({ name: 'project-guard' })
  .use(authGuard) 

  .derive(async ({ params, userId }) => {
    const projectId = (params as any)?.projectId as string | undefined
    if (!projectId) return { projectId: undefined, projectRole: undefined }

    const membership = await prisma.projectMember.findFirst({
      where: { projectId, userId },
      select: { role: true },
    })

    if (!membership) {
      throw new Error('Forbidden: not a project member')
    }

    return { projectId, projectRole: membership.role }
  })
