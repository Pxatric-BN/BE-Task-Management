import { t } from 'elysia'

export const CreateProjectBody = t.Object({
  name: t.String({ minLength: 1, maxLength: 120 }),
  description: t.Optional(t.String({ maxLength: 1000 })),
  // ตอนนี้ยัง mock user → ให้ส่ง ownerId มาจาก FE ได้ก่อน (หรือ null แล้วให้ service หา user แรก)
  ownerId: t.Optional(t.String()),
})

export const ProjectIdParams = t.Object({
  projectId: t.String(),
})
