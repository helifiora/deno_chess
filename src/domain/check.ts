import type { Board } from "@/domain/board.ts";
import type { Position } from "@/domain/position.ts";
import { type Team, teams } from "@/domain/team.ts";
import { err, ok, type Result } from "../result.ts";
import { NoKingFoundError, NoPieceFoundError } from "@/domain/domain_errors.ts";
import { selectMovesByTeam } from "@/domain/piece/helper.ts";
import { map, some } from "@/generator.ts";

export type InCheck = {
  team: Team;
  isCheckmate: boolean;
};

export type MoveCausesCheckResult = Result<
  boolean,
  NoKingFoundError | NoPieceFoundError
>;

export class CheckService {
  #board: Board;

  constructor(board: Board) {
    this.#board = board;
  }

  isInCheck(): InCheck | null {
    for (const team of teams()) {
      const king = this.#board.getKing(team);
      if (king?.isInEnemyMove()) {
        return { team, isCheckmate: this.#isCheckmate(team) };
      }
    }

    return null;
  }

  isMoveCauseCheck(origin: Position, target: Position): MoveCausesCheckResult {
    const clonedBoard = this.#board.clone();
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

  #isCheckmate(team: Team): boolean {
    const moveThatCausesCheck = map(
      selectMovesByTeam(this.#board, team, true),
      (s) => this.isMoveCauseCheck(s.origin, s.target),
    );

    const hasMoveThatUndoCheck = some(
      moveThatCausesCheck,
      (s) => s.isOk() && s.data === false,
    );

    return hasMoveThatUndoCheck === false;
  }
}
