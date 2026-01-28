import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TaskPriority = t.Union(
  [t.Literal("low"), t.Literal("medium"), t.Literal("high")],
  { additionalProperties: false },
);
