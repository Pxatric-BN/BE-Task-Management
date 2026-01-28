import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

import { PrismaClient } from '../generated/prisma/client'
import {
  TaskPlain,
  TaskPlainInputCreate,
  TaskPlainInputUpdate
} from '../generated/prismabox/Task'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const app = new Elysia()

/* ✅ เปิด CORS ตรงนี้ */
app.use(
  cors({
    origin: [
      'http://localhost:3000', // FE (Next.js)
      'http://localhost:3001', // เผื่อเรียกเอง
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
)

app
  // CREATE
  .post(
    '/tasks',
    async ({ body }) => {
      return prisma.task.create({ data: body })
    },
    {
      body: TaskPlainInputCreate,
      response: TaskPlain
    }
  )

  // READ (filter)
  .get(
    '/tasks',
    async ({ query }) => {
      return prisma.task.findMany({
        where: {
          status: query.status,
          priority: query.priority
        },
        orderBy: { createdAt: 'desc' }
      })
    },
    {
      query: t.Object({
        status: t.Optional(
          t.Union([
            t.Literal('pending'),
            t.Literal('in_progress'),
            t.Literal('done')
          ])
        ),
        priority: t.Optional(
          t.Union([
            t.Literal('low'),
            t.Literal('medium'),
            t.Literal('high')
          ])
        )
      }),
      response: t.Array(TaskPlain)
    }
  )

  // READ by id
  .get(
    '/tasks/:id',
    async ({ params: { id }, set }) => {
      const task = await prisma.task.findUnique({ where: { id } })
      if (!task) {
        set.status = 404
        return 'Task not found'
      }
      return task
    },
    {
      response: {
        200: TaskPlain,
        404: t.String()
      }
    }
  )

  // UPDATE
  .patch(
    '/tasks/:id',
    async ({ params: { id }, body, set }) => {
      try {
        return await prisma.task.update({
          where: { id },
          data: body
        })
      } catch {
        set.status = 404
        return 'Task not found'
      }
    },
    {
      body: TaskPlainInputUpdate,
      response: {
        200: TaskPlain,
        404: t.String()
      }
    }
  )

  // DELETE
  .delete(
    '/tasks/:id',
    async ({ params: { id }, set }) => {
      try {
        await prisma.task.delete({ where: { id } })
        return { message: 'Task deleted' }
      } catch {
        set.status = 404
        return { message: 'Task not found' }
      }
    },
    {
      response: t.Object({ message: t.String() })
    }
  )

/* 🔥 start server */
if (import.meta.main) {
  app.listen(3001)
  console.log('🦊 Task API running at http://localhost:3001')
}

export default app
