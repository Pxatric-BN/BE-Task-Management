import { PrismaClient, TaskPriority, TaskStatus } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding tasks...')

  await prisma.task.createMany({
    data: [
      {
        title: 'Design homepage',
        description: 'Create wireframe and UI design',
        status: TaskStatus.PENDING,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2026-02-01'),
      },
      {
        title: 'Implement API',
        status: TaskStatus.PENDING,
        priority: TaskPriority.LOW,
        dueDate: new Date('2026-02-05'),
      },
      {
        title: 'Write tests',
        status: TaskStatus.DONE,
        priority: TaskPriority.LOW,
        dueDate: new Date('2026-01-20'),
      },
    ],
  })

  console.log('✅ Seeding finished')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
