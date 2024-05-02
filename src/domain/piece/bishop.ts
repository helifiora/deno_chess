import type { Board } from "@/domain/board.ts";
import type { Position } from "@/domain/position.ts";
import { Piece, type PieceType } from "@/domain/piece/piece.ts";
import { MovementBuilder } from "@/domain/movement/builder.ts";

export class Bishop extends Piece {
  type: PieceType = "bishop";

  clone(board: Board): Piece {
    return new Bishop(board, this.team, this.position, this.moveCount);
  }

  moves(verifyCheck: boolean = true): Generator<Position> {
    return new MovementBuilder(this, verifyCheck)
      .addDiagonal()
      .build();
  }
}
