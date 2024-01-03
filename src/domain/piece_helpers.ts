import { Board } from "./board.ts";
import { Position } from "./position.ts";
import { Team } from "./team.ts";
import { Piece, PieceData } from "./piece.ts";

export function* selectMovesByTeam(
  board: Board,
  team: Team,
  verifyCheck: boolean,
): Generator<{ piece: Piece; target: Position }> {
  for (const piece of board.pieces(team)) {
    for (const move of piece.moves(verifyCheck)) {
      yield { piece, target: move };
    }
  }
}

export function isPieceDataEqual(v1: PieceData, v2: PieceData): boolean {
  return v1.cell === v2.cell &&
    v1.type === v2.type &&
    v1.moveCount === v2.moveCount &&
    v1.team === v2.team;
}
