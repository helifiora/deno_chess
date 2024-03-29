import type { Board } from "./board.ts";
import type { Position } from "./position.ts";
import type { Team } from "./team.ts";
import { err, ok, type Result } from "../result.ts";
import { NoKingFoundError, NoPieceFoundError } from "./domain_errors.ts";
import { selectMovesByTeam } from "./piece_helpers.ts";
import { map, some } from "../generator.ts";

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

export function isInCheckmate(board: Board, team: Team): boolean {
  const moveCausesCheck = map(
    selectMovesByTeam(board, team, true),
    (s) => doesMoveCausesCheck(board, s.origin, s.target),
  );

  const hasMoveThatUndoCheck = some(moveCausesCheck, (s) => s.ok && s.data === false);
  return hasMoveThatUndoCheck === false;
}

export function doesMoveCausesCheck(
  board: Board,
  origin: Position,
  target: Position,
): Result<boolean, NoKingFoundError | NoPieceFoundError> {
  const clonedBoard = board.clone();
  const clonedPiece = clonedBoard.get(origin);

  if (clonedPiece === null) {
    return err(new NoPieceFoundError(origin));
  }

  clonedBoard.move(clonedPiece, target);
  const clonedKing = clonedBoard.getKing(clonedPiece.team);

  if (clonedKing === null) {
    return err(new NoKingFoundError(clonedPiece.team));
  }

  return ok(clonedKing.isInEnemyMove());
}
