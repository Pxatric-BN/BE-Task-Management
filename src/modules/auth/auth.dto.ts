import { t } from 'elysia'

export const RegisterBody = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8, maxLength: 72 }),
  username: t.Optional(t.String({ minLength: 3, maxLength: 30 })),
  displayName: t.Optional(t.String({ minLength: 1, maxLength: 80 })),
})

export const LoginBody = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8, maxLength: 72 }),
})

export const RefreshBody = t.Object({
  refreshToken: t.String({ minLength: 20 }),
})
