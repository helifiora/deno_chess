import type { Piece, PieceData } from "@/domain/piece/piece.ts";
import type { Board } from "@/domain/board.ts";
import type { Team } from "@/domain/team.ts";
import { Rook } from "@/domain/piece/rook.ts";
import { Position } from "@/domain/position.ts";
import { Knight } from "@/domain/piece/knight.ts";
import { Pawn } from "@/domain/piece/pawn.ts";
import { King } from "@/domain/piece/king.ts";
import { Queen } from "@/domain/piece/queen.ts";
import { Bishop } from "@/domain/piece/bishop.ts";

export function toPiece(board: Board, data: PieceData): Piece {
  const { cell, moveCount, team, type } = data;
  const position = Position.fromCell(cell);
  switch (type) {
    case "rook":
      return new Rook(board, team, position, moveCount);
    case "knight":
      return new Knight(board, team, position, moveCount);
    case "pawn":
      return new Pawn(board, team, position, moveCount);
    case "king":
      return new King(board, team, position, moveCount);
    case "queen":
      return new Queen(board, team, position, moveCount);
    case "bishop":
      return new Bishop(board, team, position, moveCount);
  }
}

export function isKing(piece: Piece): piece is King {
  return piece instanceof King;
}

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
