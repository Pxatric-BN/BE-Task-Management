import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ProjectRole = t.Union([t.Literal("owner"), t.Literal("member")], {
  additionalProperties: false,
});
