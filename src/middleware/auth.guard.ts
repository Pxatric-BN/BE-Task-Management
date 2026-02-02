import { Elysia } from 'elysia'
import jwt, { type Secret } from 'jsonwebtoken'

if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error('Missing JWT_ACCESS_SECRET')
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as Secret

export const authGuard = new Elysia({ name: 'auth-guard' })

  .decorate('userId', '' as string)

  .derive(({ headers, userId }) => {
    const auth = headers.authorization
    if (!auth?.startsWith('Bearer ')) return { userId }

    const token = auth.slice('Bearer '.length)
    try {
      const decoded = jwt.verify(token, ACCESS_SECRET) as { sub?: string }
      return { userId: decoded.sub ?? '' }
    } catch {
      return { userId: '' }
    }
  })

  .onBeforeHandle(({ userId }) => {
    if (!userId) throw new Error('Unauthorized')
  })
