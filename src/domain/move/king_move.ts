import type { Piece } from "../piece.ts";
import type { Position } from "../position.ts";
import type { Move } from "./move.ts";
import { MovementBuilder } from "../movement/builder.ts";

export class KingMoves implements Move {
  #piece: Piece;

  constructor(piece: Piece) {
    this.#piece = piece;
  }

  execute(verify: boolean): Generator<Position> {
    return new MovementBuilder(this.#piece, verify)
      .addHorizontal({ take: 1 })
      .addVertical({ take: 1 })
      .addDiagonal({ take: 1 })
      .build();
  }
}
