import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ProjectInvitePlain = t.Object(
  {
    id: t.String(),
    projectId: t.String(),
    inviterId: t.String(),
    inviteeEmail: t.String(),
    token: t.String(),
    status: t.Union(
      [
        t.Literal("pending"),
        t.Literal("accepted"),
        t.Literal("expired"),
        t.Literal("revoked"),
      ],
      { additionalProperties: false },
    ),
    expiresAt: t.Date(),
    createdAt: t.Date(),
    acceptedAt: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const ProjectInviteRelations = t.Object(
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
    inviter: t.Object(
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

export const ProjectInvitePlainInputCreate = t.Object(
  {
    inviteeEmail: t.String(),
    token: t.String(),
    status: t.Optional(
      t.Union(
        [
          t.Literal("pending"),
          t.Literal("accepted"),
          t.Literal("expired"),
          t.Literal("revoked"),
        ],
        { additionalProperties: false },
      ),
    ),
    expiresAt: t.Date(),
    acceptedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const ProjectInvitePlainInputUpdate = t.Object(
  {
    inviteeEmail: t.Optional(t.String()),
    token: t.Optional(t.String()),
    status: t.Optional(
      t.Union(
        [
          t.Literal("pending"),
          t.Literal("accepted"),
          t.Literal("expired"),
          t.Literal("revoked"),
        ],
        { additionalProperties: false },
      ),
    ),
    expiresAt: t.Optional(t.Date()),
    acceptedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const ProjectInviteRelationsInputCreate = t.Object(
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
    inviter: t.Object(
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

export const ProjectInviteRelationsInputUpdate = t.Partial(
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
      inviter: t.Object(
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

export const ProjectInviteWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          projectId: t.String(),
          inviterId: t.String(),
          inviteeEmail: t.String(),
          token: t.String(),
          status: t.Union(
            [
              t.Literal("pending"),
              t.Literal("accepted"),
              t.Literal("expired"),
              t.Literal("revoked"),
            ],
            { additionalProperties: false },
          ),
          expiresAt: t.Date(),
          createdAt: t.Date(),
          acceptedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "ProjectInvite" },
  ),
);

export const ProjectInviteWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), token: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ token: t.String() })],
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
              inviterId: t.String(),
              inviteeEmail: t.String(),
              token: t.String(),
              status: t.Union(
                [
                  t.Literal("pending"),
                  t.Literal("accepted"),
                  t.Literal("expired"),
                  t.Literal("revoked"),
                ],
                { additionalProperties: false },
              ),
              expiresAt: t.Date(),
              createdAt: t.Date(),
              acceptedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "ProjectInvite" },
);

export const ProjectInviteSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      projectId: t.Boolean(),
      inviterId: t.Boolean(),
      inviteeEmail: t.Boolean(),
      token: t.Boolean(),
      status: t.Boolean(),
      expiresAt: t.Boolean(),
      createdAt: t.Boolean(),
      acceptedAt: t.Boolean(),
      project: t.Boolean(),
      inviter: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ProjectInviteInclude = t.Partial(
  t.Object(
    {
      status: t.Boolean(),
      project: t.Boolean(),
      inviter: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ProjectInviteOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      projectId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      inviterId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      inviteeEmail: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      token: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      expiresAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      acceptedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const ProjectInvite = t.Composite(
  [ProjectInvitePlain, ProjectInviteRelations],
  { additionalProperties: false },
);

export const ProjectInviteInputCreate = t.Composite(
  [ProjectInvitePlainInputCreate, ProjectInviteRelationsInputCreate],
  { additionalProperties: false },
);

export const ProjectInviteInputUpdate = t.Composite(
  [ProjectInvitePlainInputUpdate, ProjectInviteRelationsInputUpdate],
  { additionalProperties: false },
);
