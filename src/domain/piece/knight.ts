import type { Board } from "@/domain/board.ts";
import type { Position } from "@/domain/position.ts";
import { Piece, type PieceType } from "@/domain/piece/piece.ts";
import { MovementBuilder } from "@/domain/movement/builder.ts";

export class Knight extends Piece {
  type: PieceType = "knight";

  clone(board: Board): Piece {
    return new Knight(board, this.team, this.position, this.moveCount);
  }

  moves(verifyCheck: boolean = true): Generator<Position> {
    return new MovementBuilder(this, verifyCheck)
      .addL()
      .build();
  }
}
