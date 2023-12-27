import type { Board } from "./board.ts";
import type { Position } from "./position.ts";
import type { Team } from "./team.ts";
import { error, ok, type Result } from "../result.ts";
import { NoKingFoundError, NoPieceFoundError } from "./domain_errors.ts";
import { selectMovesByTeam } from "./piece_helpers.ts";

export function isInCheck(board: Board): Team | null {
  const teams: Team[] = ["black", "white"];
  for (const team of teams) {
    const king = board.getKing(team);
    if (king?.isInEnemyMove()) {
      return team;
    }
  }

  return null;
}

export function isInCheckmate(board: Board, checked: Team): boolean {
  for (const { piece, target } of selectMovesByTeam(board, checked, true)) {
    const result = doesMoveCausesCheck(board, piece.position, target);
    if (result.ok && result.data === false) {
      return false;
    }
  }

  return true;
}

export function doesMoveCausesCheck(
  board: Board,
  origin: Position,
  target: Position,
): Result<boolean, NoKingFoundError | NoPieceFoundError> {
  const clonedBoard = board.clone();
  const clonedPiece = clonedBoard.get(origin);

  if (clonedPiece === null) {
    return error(new NoPieceFoundError(origin));
  }

  clonedBoard.move(clonedPiece, target);
  const clonedKing = clonedBoard.getKing(clonedPiece.team);

  if (clonedKing === null) {
    return error(new NoKingFoundError(clonedPiece.team));
  }

  return ok(clonedKing.isInEnemyMove());
}
