import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserPlain = t.Object(
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
);

export const UserRelations = t.Object(
  {
    accounts: t.Array(
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
      { additionalProperties: false },
    ),
    sessions: t.Array(
      t.Object(
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
      ),
      { additionalProperties: false },
    ),
    ownedProjects: t.Array(
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
      { additionalProperties: false },
    ),
    memberships: t.Array(
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
      { additionalProperties: false },
    ),
    invitesSent: t.Array(
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
          acceptedAt: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    reportedTasks: t.Array(
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
      { additionalProperties: false },
    ),
    assignedTasks: t.Array(
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

export const UserPlainInputCreate = t.Object(
  {
    email: t.String(),
    username: t.Optional(__nullable__(t.String())),
    passwordHash: t.Optional(__nullable__(t.String())),
    displayName: t.Optional(__nullable__(t.String())),
    bio: t.Optional(__nullable__(t.String())),
    avatarUrl: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const UserPlainInputUpdate = t.Object(
  {
    email: t.Optional(t.String()),
    username: t.Optional(__nullable__(t.String())),
    passwordHash: t.Optional(__nullable__(t.String())),
    displayName: t.Optional(__nullable__(t.String())),
    bio: t.Optional(__nullable__(t.String())),
    avatarUrl: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const UserRelationsInputCreate = t.Object(
  {
    accounts: t.Optional(
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
    sessions: t.Optional(
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
    ownedProjects: t.Optional(
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
    memberships: t.Optional(
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
    invitesSent: t.Optional(
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
    reportedTasks: t.Optional(
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
    assignedTasks: t.Optional(
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

export const UserRelationsInputUpdate = t.Partial(
  t.Object(
    {
      accounts: t.Partial(
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
      sessions: t.Partial(
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
      ownedProjects: t.Partial(
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
      memberships: t.Partial(
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
      invitesSent: t.Partial(
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
      reportedTasks: t.Partial(
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
      assignedTasks: t.Partial(
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

export const UserWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          email: t.String(),
          username: t.String(),
          passwordHash: t.String(),
          displayName: t.String(),
          bio: t.String(),
          avatarUrl: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "User" },
  ),
);

export const UserWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), email: t.String(), username: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ email: t.String() }),
            t.Object({ username: t.String() }),
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
              email: t.String(),
              username: t.String(),
              passwordHash: t.String(),
              displayName: t.String(),
              bio: t.String(),
              avatarUrl: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "User" },
);

export const UserSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      email: t.Boolean(),
      username: t.Boolean(),
      passwordHash: t.Boolean(),
      displayName: t.Boolean(),
      bio: t.Boolean(),
      avatarUrl: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      accounts: t.Boolean(),
      sessions: t.Boolean(),
      ownedProjects: t.Boolean(),
      memberships: t.Boolean(),
      invitesSent: t.Boolean(),
      reportedTasks: t.Boolean(),
      assignedTasks: t.Boolean(),
      comments: t.Boolean(),
      attachments: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UserInclude = t.Partial(
  t.Object(
    {
      accounts: t.Boolean(),
      sessions: t.Boolean(),
      ownedProjects: t.Boolean(),
      memberships: t.Boolean(),
      invitesSent: t.Boolean(),
      reportedTasks: t.Boolean(),
      assignedTasks: t.Boolean(),
      comments: t.Boolean(),
      attachments: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UserOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      email: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      username: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      passwordHash: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      displayName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bio: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      avatarUrl: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const User = t.Composite([UserPlain, UserRelations], {
  additionalProperties: false,
});

export const UserInputCreate = t.Composite(
  [UserPlainInputCreate, UserRelationsInputCreate],
  { additionalProperties: false },
);

export const UserInputUpdate = t.Composite(
  [UserPlainInputUpdate, UserRelationsInputUpdate],
  { additionalProperties: false },
);
