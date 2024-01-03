import type { Piece } from "../piece.ts";
import type { Position } from "../position.ts";
import type { Move } from "./move.ts";
import { MovementBuilder } from "../movement/builder.ts";

export class BishopMove implements Move {
  #piece: Piece;

  constructor(piece: Piece) {
    this.#piece = piece;
  }

  execute(verify: boolean): Generator<Position> {
    return new MovementBuilder(this.#piece, verify)
      .addDiagonal()
      .build();
  }
}
