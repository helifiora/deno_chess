import { PieceData, PieceDataPositionless } from "./domain/piece.ts";
import { Team } from "./domain/team.ts";

export type GameData = {
  capturedPieces: PieceDataPositionless[];
  pieces: PieceData[];
  round: number;
  turn: Team;
};
