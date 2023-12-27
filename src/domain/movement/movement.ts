import type { Position } from "../position.ts";

export interface Movement {
  execute(): Generator<Position>;
}
