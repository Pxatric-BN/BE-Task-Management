import jwt from 'jsonwebtoken'
import { Elysia } from 'elysia'

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? ''
if (!ACCESS_SECRET) throw new Error('Missing JWT_ACCESS_SECRET')

export const authGuard = new Elysia()
  .derive(({ headers }) => {
    const auth = headers.authorization
    if (!auth?.startsWith('Bearer ')) {
      return { userId: null }
    }

    const token = auth.slice('Bearer '.length)

    try {
      const decoded: any = jwt.verify(token, ACCESS_SECRET)
      return { userId: String(decoded.sub) }
    } catch {
      return { userId: null }
    }
  })
  .onBeforeHandle(({ userId }) => {
    if (!userId) {
      // โยน error แบบง่ายก่อน (ทีหลังค่อยทำ error handler กลาง)
      throw new Error('Unauthorized')
    }
  })
