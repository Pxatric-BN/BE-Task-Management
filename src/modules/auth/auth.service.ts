import bcrypt from 'bcrypt'
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken'
import { prisma } from '../../db/prisma'
import { randomUUID, createHash } from 'crypto'

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error('Missing JWT secrets in env')
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as Secret
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as Secret
const ACCESS_EXPIRES_IN = (process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15m') as string
const REFRESH_DAYS = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS ?? '30')

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

function signAccessToken(payload: { sub: string }) {
  const options: SignOptions = {
   expiresIn: ACCESS_EXPIRES_IN as SignOptions['expiresIn'] // ✅ ใช้ '15m' จริง
  }
  return jwt.sign(payload, ACCESS_SECRET, options)
}

function signRefreshToken(payload: { sub: string; jti: string }) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: `${REFRESH_DAYS}d` })
}

type RefreshPayload = { sub: string; jti: string; iat: number; exp: number }

function verifyRefreshToken(token: string): RefreshPayload {
  const decoded = jwt.verify(token, REFRESH_SECRET) as RefreshPayload
  if (!decoded?.sub) throw new Error('Invalid refresh token payload')
  return decoded
}

// --- register/login/refresh/logout เหมือนของคุณได้เลย ---

export async function register(input: {
  email: string
  password: string
  username?: string
  displayName?: string
}) {
  const exists = await prisma.user.findUnique({ where: { email: input.email } })
  if (exists) throw new Error('Email already in use')

  const passwordHash = await bcrypt.hash(input.password, 10)

  const user = await prisma.user.create({
    data: {
      email: input.email,
      username: input.username,
      displayName: input.displayName,
      passwordHash,
    },
  })

  const accessToken = signAccessToken({ sub: user.id })
  const refreshToken = signRefreshToken({ sub: user.id, jti: randomUUID() })

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000),
    },
  })

  return {
    user: { id: user.id, email: user.email, username: user.username, displayName: user.displayName },
    accessToken,
    refreshToken,
  }
}

export async function login(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: input.email } })
  if (!user || !user.passwordHash) throw new Error('Invalid credentials')

  const ok = await bcrypt.compare(input.password, user.passwordHash)
  if (!ok) throw new Error('Invalid credentials')

  const accessToken = signAccessToken({ sub: user.id })
  const refreshToken = signRefreshToken({ sub: user.id, jti: randomUUID() })

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000),
    },
  })

  return {
    user: { id: user.id, email: user.email, username: user.username, displayName: user.displayName },
    accessToken,
    refreshToken,
  }
}

export async function refresh(input: { refreshToken: string }) {
  const decoded = verifyRefreshToken(input.refreshToken)
  const userId = decoded.sub

  const tokenHash = hashToken(input.refreshToken)

  const session = await prisma.refreshToken.findFirst({
    where: {
      userId,
      tokenHash,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
  })
  if (!session) throw new Error('Refresh token not found or expired')

  await prisma.refreshToken.update({
    where: { id: session.id },
    data: { revokedAt: new Date() },
  })

  const accessToken = signAccessToken({ sub: userId })
  const newRefreshToken = signRefreshToken({ sub: userId, jti: randomUUID() })

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash: hashToken(newRefreshToken),
      expiresAt: new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000),
    },
  })

  return { accessToken, refreshToken: newRefreshToken }
}

export async function logout(input: { refreshToken: string }) {
  const tokenHash = hashToken(input.refreshToken)
  await prisma.refreshToken.updateMany({
    where: { tokenHash, revokedAt: null },
    data: { revokedAt: new Date() },
  })
  return { ok: true }
}
