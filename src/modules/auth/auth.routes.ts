import { Elysia } from 'elysia'
import { LoginBody, RefreshBody, RegisterBody } from './auth.dto'
import { login, logout, refresh, register } from './auth.service'

export const authRoutes = new Elysia({ prefix: '/auth' })

  .post('/register', async ({ body }) => register(body), { 
    body: RegisterBody 
  })

  .post('/login', async ({ body }) => login(body), { 
    body: LoginBody 
  })

  .post('/refresh', async ({ body }) => refresh(body), { 
    body: RefreshBody 
  })

  .post('/logout', async ({ body }) => logout(body), { 
    body: RefreshBody 
  })
