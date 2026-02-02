import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ProjectMemberPlain = t.Object(
  {
    id: t.String(),
    projectId: t.String(),
    userId: t.String(),
    role: t.Union([t.Literal("owner"), t.Literal("member")], {
      additionalProperties: false,
    }),
    joinedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const ProjectMemberRelations = t.Object(
  {
    project: t.Object(
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
    user: t.Object(
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
  },
  { additionalProperties: false },
);

export const ProjectMemberPlainInputCreate = t.Object(
  {
    role: t.Optional(
      t.Union([t.Literal("owner"), t.Literal("member")], {
        additionalProperties: false,
      }),
    ),
    joinedAt: t.Optional(t.Date()),
  },
  { additionalProperties: false },
);

export const ProjectMemberPlainInputUpdate = t.Object(
  {
    role: t.Optional(
      t.Union([t.Literal("owner"), t.Literal("member")], {
        additionalProperties: false,
      }),
    ),
    joinedAt: t.Optional(t.Date()),
  },
  { additionalProperties: false },
);

export const ProjectMemberRelationsInputCreate = t.Object(
  {
    project: t.Object(
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
    user: t.Object(
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

export const ProjectMemberRelationsInputUpdate = t.Partial(
  t.Object(
    {
      project: t.Object(
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
      user: t.Object(
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

export const ProjectMemberWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          projectId: t.String(),
          userId: t.String(),
          role: t.Union([t.Literal("owner"), t.Literal("member")], {
            additionalProperties: false,
          }),
          joinedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "ProjectMember" },
  ),
);

export const ProjectMemberWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              projectId_userId: t.Object(
                { projectId: t.String(), userId: t.String() },
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
              projectId_userId: t.Object(
                { projectId: t.String(), userId: t.String() },
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
            {
              id: t.String(),
              projectId: t.String(),
              userId: t.String(),
              role: t.Union([t.Literal("owner"), t.Literal("member")], {
                additionalProperties: false,
              }),
              joinedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "ProjectMember" },
);

export const ProjectMemberSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      projectId: t.Boolean(),
      userId: t.Boolean(),
      role: t.Boolean(),
      joinedAt: t.Boolean(),
      project: t.Boolean(),
      user: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ProjectMemberInclude = t.Partial(
  t.Object(
    {
      role: t.Boolean(),
      project: t.Boolean(),
      user: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ProjectMemberOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      projectId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      joinedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const ProjectMember = t.Composite(
  [ProjectMemberPlain, ProjectMemberRelations],
  { additionalProperties: false },
);

export const ProjectMemberInputCreate = t.Composite(
  [ProjectMemberPlainInputCreate, ProjectMemberRelationsInputCreate],
  { additionalProperties: false },
);

export const ProjectMemberInputUpdate = t.Composite(
  [ProjectMemberPlainInputUpdate, ProjectMemberRelationsInputUpdate],
  { additionalProperties: false },
);
