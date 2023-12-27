import { Board } from "../../domain/board.ts";
import { Cell } from "../../domain/cell.ts";
import { Piece } from "../../domain/piece.ts";
import { Position } from "../../domain/position.ts";
import { GameData } from "../../game.ts";
import { error, ok, type Result } from "../../result.ts";
import { NoPieceInCellError } from "./errors.ts";

type Input = { cell: Cell };
type Output = Result<Piece, NoPieceInCellError>;

export function selectPiece(data: GameData, input: Input): Output {
  const board = Board.restore(data.pieces);
  const piece = board.get(Position.fromCell(input.cell));
  if (piece === null) {
    return error(new NoPieceInCellError(input.cell));
  }

  return ok(piece);
}
