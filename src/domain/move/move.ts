import type { Position } from "../position.ts";

export interface Move {
  execute(verify: boolean): Generator<Position>;
}
