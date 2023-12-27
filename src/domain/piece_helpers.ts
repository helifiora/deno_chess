import { Board } from "./board.ts";
import { Position } from "./position.ts";
import { Team } from "./team.ts";
import { Piece } from "./piece.ts";

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
