import type { Piece } from "../piece.ts";
import type { Position } from "../position.ts";
import { MovementBuilder } from "../movement/builder.ts";
import { Move } from "./move.ts";

export class QueenMove implements Move {
  #piece: Piece;

  constructor(piece: Piece) {
    this.#piece = piece;
  }

  execute(verify: boolean): Generator<Position> {
    return new MovementBuilder(this.#piece.board, this.#piece, verify)
      .addHorizontal()
      .addVertical()
      .addDiagonal()
      .build();
  }
}
