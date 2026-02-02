import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TaskTagPlain = t.Object(
  { id: t.String(), taskId: t.String(), tagId: t.String() },
  { additionalProperties: false },
);

export const TaskTagRelations = t.Object(
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
    tag: t.Object(
      {
        id: t.String(),
        projectId: t.String(),
        name: t.String(),
        color: __nullable__(t.String()),
        createdAt: t.Date(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const TaskTagPlainInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const TaskTagPlainInputUpdate = t.Object(
  {},
  { additionalProperties: false },
);

export const TaskTagRelationsInputCreate = t.Object(
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
    tag: t.Object(
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
  },
  { additionalProperties: false },
);

export const TaskTagRelationsInputUpdate = t.Partial(
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
      tag: t.Object(
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
    },
    { additionalProperties: false },
  ),
);

export const TaskTagWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          taskId: t.String(),
          tagId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "TaskTag" },
  ),
);

export const TaskTagWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              taskId_tagId: t.Object(
                { taskId: t.String(), tagId: t.String() },
                { additionalProperties: false },
              ),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({
              taskId_tagId: t.Object(
                { taskId: t.String(), tagId: t.String() },
                { additionalProperties: false },
              ),
            }),
          ],
          { additionalProperties: false },
        ),
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
            { id: t.String(), taskId: t.String(), tagId: t.String() },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "TaskTag" },
);

export const TaskTagSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      taskId: t.Boolean(),
      tagId: t.Boolean(),
      task: t.Boolean(),
      tag: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TaskTagInclude = t.Partial(
  t.Object(
    { task: t.Boolean(), tag: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const TaskTagOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      taskId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      tagId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const TaskTag = t.Composite([TaskTagPlain, TaskTagRelations], {
  additionalProperties: false,
});

export const TaskTagInputCreate = t.Composite(
  [TaskTagPlainInputCreate, TaskTagRelationsInputCreate],
  { additionalProperties: false },
);

export const TaskTagInputUpdate = t.Composite(
  [TaskTagPlainInputUpdate, TaskTagRelationsInputUpdate],
  { additionalProperties: false },
);
