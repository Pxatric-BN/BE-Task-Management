import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TaskPlain = t.Object(
  {
    id: t.String(),
    title: t.String(),
    description: __nullable__(t.String()),
    status: t.Union(
      [
        t.Literal("pending"),
        t.Literal("in_progress"),
        t.Literal("done"),
        t.Literal("review"),
      ],
      { additionalProperties: false },
    ),
    priority: t.Union(
      [t.Literal("low"), t.Literal("medium"), t.Literal("high")],
      { additionalProperties: false },
    ),
    dueDate: t.Date(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    projectId: __nullable__(t.String()),
    reporterId: __nullable__(t.String()),
    assigneeId: __nullable__(t.String()),
    progress: t.Integer(),
    position: t.Integer(),
  },
  { additionalProperties: false },
);

export const TaskRelations = t.Object(
  {
    project: __nullable__(
      t.Object(
        {
          id: t.String(),
          name: t.String(),
          description: __nullable__(t.String()),
          ownerId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
    reporter: __nullable__(
      t.Object(
        {
          id: t.String(),
          email: t.String(),
          username: __nullable__(t.String()),
          passwordHash: __nullable__(t.String()),
          displayName: __nullable__(t.String()),
          bio: __nullable__(t.String()),
          avatarUrl: __nullable__(t.String()),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
    assignee: __nullable__(
      t.Object(
        {
          id: t.String(),
          email: t.String(),
          username: __nullable__(t.String()),
          passwordHash: __nullable__(t.String()),
          displayName: __nullable__(t.String()),
          bio: __nullable__(t.String()),
          avatarUrl: __nullable__(t.String()),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
    tags: t.Array(
      t.Object(
        { id: t.String(), taskId: t.String(), tagId: t.String() },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    comments: t.Array(
      t.Object(
        {
          id: t.String(),
          taskId: t.String(),
          authorId: t.String(),
          content: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    attachments: t.Array(
      t.Object(
        {
          id: t.String(),
          uploaderId: t.String(),
          taskId: __nullable__(t.String()),
          commentId: __nullable__(t.String()),
          fileName: t.String(),
          mimeType: t.String(),
          size: t.Integer(),
          storageKey: t.String(),
          url: __nullable__(t.String()),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const TaskPlainInputCreate = t.Object(
  {
    title: t.String(),
    description: t.Optional(__nullable__(t.String())),
    status: t.Optional(
      t.Union(
        [
          t.Literal("pending"),
          t.Literal("in_progress"),
          t.Literal("done"),
          t.Literal("review"),
        ],
        { additionalProperties: false },
      ),
    ),
    priority: t.Optional(
      t.Union([t.Literal("low"), t.Literal("medium"), t.Literal("high")], {
        additionalProperties: false,
      }),
    ),
    dueDate: t.Date(),
    progress: t.Optional(t.Integer()),
    position: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const TaskPlainInputUpdate = t.Object(
  {
    title: t.Optional(t.String()),
    description: t.Optional(__nullable__(t.String())),
    status: t.Optional(
      t.Union(
        [
          t.Literal("pending"),
          t.Literal("in_progress"),
          t.Literal("done"),
          t.Literal("review"),
        ],
        { additionalProperties: false },
      ),
    ),
    priority: t.Optional(
      t.Union([t.Literal("low"), t.Literal("medium"), t.Literal("high")], {
        additionalProperties: false,
      }),
    ),
    dueDate: t.Optional(t.Date()),
    progress: t.Optional(t.Integer()),
    position: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const TaskRelationsInputCreate = t.Object(
  {
    project: t.Optional(
      t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    reporter: t.Optional(
      t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    assignee: t.Optional(
      t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    tags: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    comments: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    attachments: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const TaskRelationsInputUpdate = t.Partial(
  t.Object(
    {
      project: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
      reporter: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
      assignee: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
      tags: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
      comments: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
      attachments: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const TaskWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          title: t.String(),
          description: t.String(),
          status: t.Union(
            [
              t.Literal("pending"),
              t.Literal("in_progress"),
              t.Literal("done"),
              t.Literal("review"),
            ],
            { additionalProperties: false },
          ),
          priority: t.Union(
            [t.Literal("low"), t.Literal("medium"), t.Literal("high")],
            { additionalProperties: false },
          ),
          dueDate: t.Date(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          projectId: t.String(),
          reporterId: t.String(),
          assigneeId: t.String(),
          progress: t.Integer(),
          position: t.Integer(),
        },
        { additionalProperties: false },
      ),
    { $id: "Task" },
  ),
);

export const TaskWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              title: t.String(),
              description: t.String(),
              status: t.Union(
                [
                  t.Literal("pending"),
                  t.Literal("in_progress"),
                  t.Literal("done"),
                  t.Literal("review"),
                ],
                { additionalProperties: false },
              ),
              priority: t.Union(
                [t.Literal("low"), t.Literal("medium"), t.Literal("high")],
                { additionalProperties: false },
              ),
              dueDate: t.Date(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
              projectId: t.String(),
              reporterId: t.String(),
              assigneeId: t.String(),
              progress: t.Integer(),
              position: t.Integer(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Task" },
);

export const TaskSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      title: t.Boolean(),
      description: t.Boolean(),
      status: t.Boolean(),
      priority: t.Boolean(),
      dueDate: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      projectId: t.Boolean(),
      reporterId: t.Boolean(),
      assigneeId: t.Boolean(),
      progress: t.Boolean(),
      position: t.Boolean(),
      project: t.Boolean(),
      reporter: t.Boolean(),
      assignee: t.Boolean(),
      tags: t.Boolean(),
      comments: t.Boolean(),
      attachments: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TaskInclude = t.Partial(
  t.Object(
    {
      status: t.Boolean(),
      priority: t.Boolean(),
      project: t.Boolean(),
      reporter: t.Boolean(),
      assignee: t.Boolean(),
      tags: t.Boolean(),
      comments: t.Boolean(),
      attachments: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TaskOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      dueDate: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      projectId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      reporterId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      assigneeId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      progress: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      position: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Task = t.Composite([TaskPlain, TaskRelations], {
  additionalProperties: false,
});

export const TaskInputCreate = t.Composite(
  [TaskPlainInputCreate, TaskRelationsInputCreate],
  { additionalProperties: false },
);

export const TaskInputUpdate = t.Composite(
  [TaskPlainInputUpdate, TaskRelationsInputUpdate],
  { additionalProperties: false },
);
