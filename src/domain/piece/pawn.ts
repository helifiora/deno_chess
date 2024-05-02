import type { Board } from "@/domain/board.ts";
import type { Position } from "@/domain/position.ts";
import type { AcceptanceFn } from "@/domain/movement/acceptance.ts";
import { Piece, type PieceType } from "@/domain/piece/piece.ts";
import { MovementBuilder } from "@/domain/movement/builder.ts";
import { toDirection } from "@/domain/direction.ts";

export class Pawn extends Piece {
  type: PieceType = "pawn";

  clone(board: Board): Piece {
    return new Pawn(board, this.team, this.position, this.moveCount);
  }

  moves(verifyCheck: boolean = true): Generator<Position> {
    const direction = toDirection(this.team);

    return new MovementBuilder(this, verifyCheck)
      .addDiagonal({
        acceptance: this.#diagonalAcceptance,
        direction,
        take: 1,
      })
      .addVertical({
        acceptance: this.#verticalAcceptance,
        take: this.#takeVertical(),
        direction,
      })
      .build();
  }

  #takeVertical(): number {
    return this.moveCount === 0 ? 2 : 1;
  }

  #verticalAcceptance: AcceptanceFn = (target) => {
    return target.piece === null ? "next" : "stop";
  };

  #diagonalAcceptance: AcceptanceFn = (target) => {
    return (target.piece === null || target.piece.hasSameTeam(this))
      ? "stop"
      : "next";
  };
}
