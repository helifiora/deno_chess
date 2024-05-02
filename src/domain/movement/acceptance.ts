import type { Piece } from "@/domain/piece/piece.ts";
import type { Position } from "../position.ts";

type Target = { piece: Piece | null; position: Position };

export type AcceptanceFn = (target: Target) => Acceptance;

export type Acceptance =
  | "next"
  | "stop"
  | "last";
