import { toDirection } from "../direction.ts";
import { AcceptanceFn } from "../movement/acceptance.ts";
import { MovementBuilder } from "../movement/builder.ts";
import type { Piece } from "../piece.ts";
import type { Position } from "../position.ts";
import type { Move } from "./move.ts";

export class PawnMove implements Move {
  #piece: Piece;

  constructor(piece: Piece) {
    this.#piece = piece;
  }

  execute(verify: boolean): Generator<Position> {
    const direction = toDirection(this.#piece.team);

    return new MovementBuilder(this.#piece, verify)
      .addDiagonal({
        acceptance: this.#diagonalAcceptance,
        direction,
        take: 1,
      })
      .addVertical({
        acceptance: this.#verticalAcceptance,
        direction,
        take: this.#takeVertical(),
      })
      .build();
  }

  #takeVertical(): number {
    return this.#piece.moveCount === 0 ? 2 : 1;
  }

  #verticalAcceptance: AcceptanceFn = (target) => {
    return target.piece === null ? "next" : "stop";
  };

  #diagonalAcceptance: AcceptanceFn = (target) => {
    if (target.piece === null || target.piece.hasSameTeam(this.#piece)) {
      return "stop";
    }

    return "next";
  };
}
