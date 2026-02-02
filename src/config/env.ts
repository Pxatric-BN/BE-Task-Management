export const env = {
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  PORT: process.env.PORT ? Number(process.env.PORT) : 3001,
}

if (!env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL in environment variables')
}
