import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AttachmentPlain = t.Object(
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
);

export const AttachmentRelations = t.Object(
  {
    uploader: t.Object(
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
    task: __nullable__(
      t.Object(
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
    ),
    comment: __nullable__(
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
  },
  { additionalProperties: false },
);

export const AttachmentPlainInputCreate = t.Object(
  {
    fileName: t.String(),
    mimeType: t.String(),
    size: t.Integer(),
    storageKey: t.String(),
    url: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const AttachmentPlainInputUpdate = t.Object(
  {
    fileName: t.Optional(t.String()),
    mimeType: t.Optional(t.String()),
    size: t.Optional(t.Integer()),
    storageKey: t.Optional(t.String()),
    url: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const AttachmentRelationsInputCreate = t.Object(
  {
    uploader: t.Object(
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
    task: t.Optional(
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
    comment: t.Optional(
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
  },
  { additionalProperties: false },
);

export const AttachmentRelationsInputUpdate = t.Partial(
  t.Object(
    {
      uploader: t.Object(
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
      task: t.Partial(
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
      comment: t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const AttachmentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          uploaderId: t.String(),
          taskId: t.String(),
          commentId: t.String(),
          fileName: t.String(),
          mimeType: t.String(),
          size: t.Integer(),
          storageKey: t.String(),
          url: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Attachment" },
  ),
);

export const AttachmentWhereUnique = t.Recursive(
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
              uploaderId: t.String(),
              taskId: t.String(),
              commentId: t.String(),
              fileName: t.String(),
              mimeType: t.String(),
              size: t.Integer(),
              storageKey: t.String(),
              url: t.String(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Attachment" },
);

export const AttachmentSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      uploaderId: t.Boolean(),
      taskId: t.Boolean(),
      commentId: t.Boolean(),
      fileName: t.Boolean(),
      mimeType: t.Boolean(),
      size: t.Boolean(),
      storageKey: t.Boolean(),
      url: t.Boolean(),
      createdAt: t.Boolean(),
      uploader: t.Boolean(),
      task: t.Boolean(),
      comment: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const AttachmentInclude = t.Partial(
  t.Object(
    {
      uploader: t.Boolean(),
      task: t.Boolean(),
      comment: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const AttachmentOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      uploaderId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      taskId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      commentId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      fileName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      mimeType: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      size: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      storageKey: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      url: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Attachment = t.Composite([AttachmentPlain, AttachmentRelations], {
  additionalProperties: false,
});

export const AttachmentInputCreate = t.Composite(
  [AttachmentPlainInputCreate, AttachmentRelationsInputCreate],
  { additionalProperties: false },
);

export const AttachmentInputUpdate = t.Composite(
  [AttachmentPlainInputUpdate, AttachmentRelationsInputUpdate],
  { additionalProperties: false },
);
