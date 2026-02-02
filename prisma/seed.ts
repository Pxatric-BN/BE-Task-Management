import {
  PrismaClient,
  TaskPriority,
  TaskStatus,
  ProjectRole,
  InviteStatus,
} from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database (jira-like)...')

  /* =========================
     0) CLEAR DATA (DEV ONLY)
     ลบตามลำดับ relation กัน FK error
  ========================= */
  await prisma.attachment.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.taskTag.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.task.deleteMany()

  await prisma.projectMember.deleteMany()
  await prisma.projectInvite.deleteMany()
  await prisma.project.deleteMany()

  await prisma.refreshToken.deleteMany()
  await prisma.authAccount.deleteMany()
  await prisma.user.deleteMany()

  /* =========================
     1) USERS (REQ-01/02)
  ========================= */
  const passwordHash = await bcrypt.hash('Password123!', 10)

  const owner = await prisma.user.create({
    data: {
      email: 'owner@jira.local',
      username: 'owner',
      displayName: 'Project Owner',
      passwordHash,
      avatarUrl: '/uploads/avatars/owner.png',
    },
  })

  const alice = await prisma.user.create({
    data: {
      email: 'alice@jira.local',
      username: 'alice',
      displayName: 'Alice Dev',
      passwordHash,
      avatarUrl: '/uploads/avatars/alice.png',
    },
  })

  const bob = await prisma.user.create({
    data: {
      email: 'bob@jira.local',
      username: 'bob',
      displayName: 'Bob QA',
      passwordHash,
      avatarUrl: '/uploads/avatars/bob.png',
    },
  })

  /* =========================
     2) PROJECT + MEMBERS (REQ-04/06)
  ========================= */
  const project = await prisma.project.create({
    data: {
      name: 'Jira-like Task Management',
      description: 'Demo workspace for Elysia + Bun + Prisma + Supabase',
      ownerId: owner.id,
    },
  })

  await prisma.projectMember.createMany({
    data: [
      { projectId: project.id, userId: owner.id, role: ProjectRole.owner },
      { projectId: project.id, userId: alice.id, role: ProjectRole.member },
      { projectId: project.id, userId: bob.id, role: ProjectRole.member },
    ],
  })

  /* =========================
     3) INVITE (REQ-05)
  ========================= */
  await prisma.projectInvite.create({
    data: {
      projectId: project.id,
      inviterId: owner.id,
      inviteeEmail: 'newmember@jira.local',
      token: `invite_${randomUUID()}`,
      status: InviteStatus.pending,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  })

  /* =========================
     4) TAGS (REQ-08 tags)
  ========================= */
  const tagBackend = await prisma.tag.create({
    data: { projectId: project.id, name: 'backend', color: '#0EA5E9' },
  })
  const tagFrontend = await prisma.tag.create({
    data: { projectId: project.id, name: 'frontend', color: '#A855F7' },
  })
  const tagBug = await prisma.tag.create({
    data: { projectId: project.id, name: 'bug', color: '#EF4444' },
  })

  /* =========================
     5) TASKS (REQ-07..14)
     - ยังคง task fields เดิมของ FE
     - เพิ่ม: projectId, reporterId, assigneeId, progress, position
  ========================= */
  const tasks = await prisma.task.createMany({
    data: [
      {
        title: 'Design homepage',
        description: 'Create wireframe and UI design',
        status: TaskStatus.pending,
        priority: TaskPriority.high,
        dueDate: new Date('2026-02-01'),

        // add-on fields
        projectId: project.id,
        reporterId: owner.id,
        assigneeId: alice.id,
        progress: 10,
        position: 1000,
      },
      {
        title: 'Implement API',
        description: 'Task CRUD + filters + board',
        status: TaskStatus.in_progress,
        priority: TaskPriority.high,
        dueDate: new Date('2026-02-05'),

        projectId: project.id,
        reporterId: owner.id,
        assigneeId: alice.id,
        progress: 45,
        position: 2000,
      },
      {
        title: 'Write tests',
        description: 'Unit + integration tests',
        status: TaskStatus.done,
        priority: TaskPriority.low,
        dueDate: new Date('2026-01-20'),

        projectId: project.id,
        reporterId: alice.id,
        assigneeId: bob.id,
        progress: 100,
        position: 3000,
      },
      {
        title: 'Fix bug: filter by assignee',
        description: 'My Tasks page should show assigned tasks correctly',
        status: TaskStatus.pending,
        priority: TaskPriority.medium,
        dueDate: new Date('2026-02-03'),

        projectId: project.id,
        reporterId: bob.id,
        assigneeId: bob.id,
        progress: 0,
        position: 1500,
      },
    ],
  })

  // Prisma createMany ไม่ return records ในหลาย DB
  // ดังนั้นเราดึง tasks กลับมาเพื่อเอา id ไปผูก tags/comments/attachments
  const taskList = await prisma.task.findMany({
    where: { projectId: project.id },
    orderBy: { createdAt: 'asc' },
  })

  const [t1, t2, t3, t4] = taskList

  /* =========================
     6) TASK TAGS (REQ-08 tags)
  ========================= */
  await prisma.taskTag.createMany({
    data: [
      { id: randomUUID(), taskId: t1.id, tagId: tagFrontend.id },
      { id: randomUUID(), taskId: t1.id, tagId: tagBackend.id },

      { id: randomUUID(), taskId: t2.id, tagId: tagBackend.id },

      { id: randomUUID(), taskId: t3.id, tagId: tagBackend.id },

      { id: randomUUID(), taskId: t4.id, tagId: tagBug.id },
    ],
  })

  /* =========================
     7) COMMENTS (REQ-15)
  ========================= */
  const c1 = await prisma.comment.create({
    data: {
      taskId: t2.id,
      authorId: alice.id,
      content: 'กำลังทำ JWT + refresh token rotation อยู่ครับ',
    },
  })

  const c2 = await prisma.comment.create({
    data: {
      taskId: t4.id,
      authorId: bob.id,
      content: 'เดี๋ยวเพิ่ม index + query builder ให้ filter เร็วขึ้น',
    },
  })

  /* =========================
     8) ATTACHMENTS (REQ-16) - local uploads metadata
  ========================= */
  await prisma.attachment.createMany({
    data: [
      {
        uploaderId: owner.id,
        taskId: t2.id,
        fileName: 'api-spec.pdf',
        mimeType: 'application/pdf',
        size: 234567,
        storageKey: `tasks/${t2.id}/api-spec.pdf`,
        url: `/uploads/tasks/${t2.id}/api-spec.pdf`,
      },
      {
        uploaderId: alice.id,
        commentId: c1.id,
        fileName: 'auth-flow.png',
        mimeType: 'image/png',
        size: 123456,
        storageKey: `comments/${c1.id}/auth-flow.png`,
        url: `/uploads/comments/${c1.id}/auth-flow.png`,
      },
      {
        uploaderId: bob.id,
        taskId: t4.id,
        fileName: 'bug-screenshot.png',
        mimeType: 'image/png',
        size: 99887,
        storageKey: `tasks/${t4.id}/bug-screenshot.png`,
        url: `/uploads/tasks/${t4.id}/bug-screenshot.png`,
      },
    ],
  })

  console.log('✅ Seeding finished')
  console.log('Project:', { id: project.id, name: project.name })
  console.log('Users:', {
    owner: owner.email,
    alice: alice.email,
    bob: bob.email,
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
