import type { Board } from "@/domain/board.ts";
import type { Position } from "@/domain/position.ts";
import { Piece, type PieceType } from "@/domain/piece/piece.ts";
import { MovementBuilder } from "@/domain/movement/builder.ts";

export class King extends Piece {
  type: PieceType = "king";

  clone(board: Board): Piece {
    return new King(board, this.team, this.position, this.moveCount);
  }

  moves(verifyCheck: boolean = true): Generator<Position> {
    return new MovementBuilder(this, verifyCheck)
      .addHorizontal({ take: 1 })
      .addVertical({ take: 1 })
      .addDiagonal({ take: 1 })
      .build();
  }
}
