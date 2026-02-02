import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CommentPlain = t.Object(
  {
    id: t.String(),
    taskId: t.String(),
    authorId: t.String(),
    content: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const CommentRelations = t.Object(
  {
    task: t.Object(
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
    ),
    author: t.Object(
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

export const CommentPlainInputCreate = t.Object(
  { content: t.String() },
  { additionalProperties: false },
);

export const CommentPlainInputUpdate = t.Object(
  { content: t.Optional(t.String()) },
  { additionalProperties: false },
);

export const CommentRelationsInputCreate = t.Object(
  {
    task: t.Object(
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
    author: t.Object(
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

export const CommentRelationsInputUpdate = t.Partial(
  t.Object(
    {
      task: t.Object(
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
      author: t.Object(
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

export const CommentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          taskId: t.String(),
          authorId: t.String(),
          content: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Comment" },
  ),
);

export const CommentWhereUnique = t.Recursive(
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
              taskId: t.String(),
              authorId: t.String(),
              content: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Comment" },
);

export const CommentSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      taskId: t.Boolean(),
      authorId: t.Boolean(),
      content: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      task: t.Boolean(),
      author: t.Boolean(),
      attachments: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const CommentInclude = t.Partial(
  t.Object(
    {
      task: t.Boolean(),
      author: t.Boolean(),
      attachments: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const CommentOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      taskId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      authorId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      content: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Comment = t.Composite([CommentPlain, CommentRelations], {
  additionalProperties: false,
});

export const CommentInputCreate = t.Composite(
  [CommentPlainInputCreate, CommentRelationsInputCreate],
  { additionalProperties: false },
);

export const CommentInputUpdate = t.Composite(
  [CommentPlainInputUpdate, CommentRelationsInputUpdate],
  { additionalProperties: false },
);
