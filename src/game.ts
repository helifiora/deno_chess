import type { PieceData, PieceDataPositionless } from "@/domain/piece/piece.ts";
import type { Team } from "@/domain/team.ts";

export type GameData = {
  capturedPieces: PieceDataPositionless[];
  pieces: PieceData[];
  round: number;
  turn: Team;
};
