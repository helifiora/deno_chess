import type { Position } from "../position.ts";

export type AcceptanceFn = (target: Position) => Acceptance;

export type Acceptance =
  | "next"
  | "stop"
  | "last";
