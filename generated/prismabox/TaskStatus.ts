import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TaskStatus = t.Union(
  [t.Literal("pending"), t.Literal("in_progress"), t.Literal("done")],
  { additionalProperties: false },
);
