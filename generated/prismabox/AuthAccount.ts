import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AuthAccountPlain = t.Object(
  {
    id: t.String(),
    provider: t.Union([t.Literal("local"), t.Literal("google")], {
      additionalProperties: false,
    }),
    providerId: t.String(),
    userId: t.String(),
    createdAt: t.Date(),
  },
  { additionalProperties: false },
);

export const AuthAccountRelations = t.Object(
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

export const AuthAccountPlainInputCreate = t.Object(
  {
    provider: t.Union([t.Literal("local"), t.Literal("google")], {
      additionalProperties: false,
    }),
  },
  { additionalProperties: false },
);

export const AuthAccountPlainInputUpdate = t.Object(
  {
    provider: t.Optional(
      t.Union([t.Literal("local"), t.Literal("google")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const AuthAccountRelationsInputCreate = t.Object(
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

export const AuthAccountRelationsInputUpdate = t.Partial(
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

export const AuthAccountWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          provider: t.Union([t.Literal("local"), t.Literal("google")], {
            additionalProperties: false,
          }),
          providerId: t.String(),
          userId: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "AuthAccount" },
  ),
);

export const AuthAccountWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              provider_providerId: t.Object(
                {
                  provider: t.Union([t.Literal("local"), t.Literal("google")], {
                    additionalProperties: false,
                  }),
                  providerId: t.String(),
                },
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
              provider_providerId: t.Object(
                {
                  provider: t.Union([t.Literal("local"), t.Literal("google")], {
                    additionalProperties: false,
                  }),
                  providerId: t.String(),
                },
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
              provider: t.Union([t.Literal("local"), t.Literal("google")], {
                additionalProperties: false,
              }),
              providerId: t.String(),
              userId: t.String(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "AuthAccount" },
);

export const AuthAccountSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      provider: t.Boolean(),
      providerId: t.Boolean(),
      userId: t.Boolean(),
      createdAt: t.Boolean(),
      user: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const AuthAccountInclude = t.Partial(
  t.Object(
    { provider: t.Boolean(), user: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const AuthAccountOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      providerId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const AuthAccount = t.Composite(
  [AuthAccountPlain, AuthAccountRelations],
  { additionalProperties: false },
);

export const AuthAccountInputCreate = t.Composite(
  [AuthAccountPlainInputCreate, AuthAccountRelationsInputCreate],
  { additionalProperties: false },
);

export const AuthAccountInputUpdate = t.Composite(
  [AuthAccountPlainInputUpdate, AuthAccountRelationsInputUpdate],
  { additionalProperties: false },
);
