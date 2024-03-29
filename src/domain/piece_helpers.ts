import type { Board } from "./board.ts";
import type { Position } from "./position.ts";
import type { Team } from "./team.ts";
import type { PieceData } from "./piece.ts";

type PieceMove = { origin: Position; target: Position };

export function* selectMovesByTeam(
  board: Board,
  team: Team,
  verifyCheck: boolean,
): Generator<PieceMove> {
  for (const piece of board.pieces(team)) {
    for (const move of piece.moves(verifyCheck)) {
      yield { origin: piece.position, target: move };
    }
  }
}

export function isPieceDataEqual(p1: PieceData, p2: PieceData): boolean {
  return p1.cell === p2.cell &&
    p1.type === p2.type &&
    p1.moveCount === p2.moveCount &&
    p1.team === p2.team;
}
