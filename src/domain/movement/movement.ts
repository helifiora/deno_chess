import type { Position } from "@/domain/position.ts";

export interface Movement {
  execute(): Generator<Position>;
}
