import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const InviteStatus = t.Union(
  [
    t.Literal("pending"),
    t.Literal("accepted"),
    t.Literal("expired"),
    t.Literal("revoked"),
  ],
  { additionalProperties: false },
);
