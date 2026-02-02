import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const RefreshTokenPlain = t.Object(
  {
    id: t.String(),
    userId: t.String(),
    tokenHash: t.String(),
    createdAt: t.Date(),
    expiresAt: t.Date(),
    revokedAt: __nullable__(t.Date()),
    userAgent: __nullable__(t.String()),
    ipAddress: __nullable__(t.String()),
  },
  { additionalProperties: false },
);

export const RefreshTokenRelations = t.Object(
  {
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

export const RefreshTokenPlainInputCreate = t.Object(
  {
    tokenHash: t.String(),
    expiresAt: t.Date(),
    revokedAt: t.Optional(__nullable__(t.Date())),
    userAgent: t.Optional(__nullable__(t.String())),
    ipAddress: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const RefreshTokenPlainInputUpdate = t.Object(
  {
    tokenHash: t.Optional(t.String()),
    expiresAt: t.Optional(t.Date()),
    revokedAt: t.Optional(__nullable__(t.Date())),
    userAgent: t.Optional(__nullable__(t.String())),
    ipAddress: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const RefreshTokenRelationsInputCreate = t.Object(
  {
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

export const RefreshTokenRelationsInputUpdate = t.Partial(
  t.Object(
    {
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

export const RefreshTokenWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          userId: t.String(),
          tokenHash: t.String(),
          createdAt: t.Date(),
          expiresAt: t.Date(),
          revokedAt: t.Date(),
          userAgent: t.String(),
          ipAddress: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "RefreshToken" },
  ),
);

export const RefreshTokenWhereUnique = t.Recursive(
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
              userId: t.String(),
              tokenHash: t.String(),
              createdAt: t.Date(),
              expiresAt: t.Date(),
              revokedAt: t.Date(),
              userAgent: t.String(),
              ipAddress: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "RefreshToken" },
);

export const RefreshTokenSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      userId: t.Boolean(),
      tokenHash: t.Boolean(),
      createdAt: t.Boolean(),
      expiresAt: t.Boolean(),
      revokedAt: t.Boolean(),
      userAgent: t.Boolean(),
      ipAddress: t.Boolean(),
      user: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const RefreshTokenInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const RefreshTokenOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      tokenHash: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      expiresAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      revokedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userAgent: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      ipAddress: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const RefreshToken = t.Composite(
  [RefreshTokenPlain, RefreshTokenRelations],
  { additionalProperties: false },
);

export const RefreshTokenInputCreate = t.Composite(
  [RefreshTokenPlainInputCreate, RefreshTokenRelationsInputCreate],
  { additionalProperties: false },
);

export const RefreshTokenInputUpdate = t.Composite(
  [RefreshTokenPlainInputUpdate, RefreshTokenRelationsInputUpdate],
  { additionalProperties: false },
);
