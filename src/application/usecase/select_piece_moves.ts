import type { Cell } from "../../domain/cell.ts";
import type { GameData } from "../../game.ts";
import { Board } from "../../domain/board.ts";
import { Position } from "../../domain/position.ts";
import { NoPieceInCellError, NoPieceTurnError } from "./errors.ts";
import { error, ok, type Result } from "../../result.ts";
import { toArray } from "../../generator.ts";

type Input = { origin: Cell };

type Output = Result<Cell[], NoPieceInCellError | NoPieceTurnError>;

export function selectPieceMoves(data: GameData, input: Input): Output {
  const board = Board.restore(data.pieces);
  const piece = board.get(Position.fromCell(input.origin));

  if (piece === null) {
    return error(new NoPieceInCellError(input.origin));
  }

  if (data.turn !== piece.team) {
    return error(new NoPieceTurnError(data.turn, piece.team));
  }

  const result = toArray(piece.moves(true), (s) => s.toCell());
  return ok(result);
}
