import { MovementBuilder } from "../movement/builder.ts";
import type { Piece } from "../piece.ts";
import type { Position } from "../position.ts";
import type { Move } from "./move.ts";

export class KnightMove implements Move {
  #piece: Piece;

  constructor(piece: Piece) {
    this.#piece = piece;
  }

  execute(verify: boolean): Generator<Position> {
    return new MovementBuilder(this.#piece.board, this.#piece, verify)
      .addL()
      .build();
  }
}
