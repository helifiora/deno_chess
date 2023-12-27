import type { Piece } from "../piece.ts";
import type { Move } from "./move.ts";
import { BishopMove } from "./bishop_move.ts";
import { KingMoves } from "./king_move.ts";
import { KnightMove } from "./knight_move.ts";
import { PawnMove } from "./pawn_move.ts";
import { QueenMove } from "./queen_move.ts";
import { RookMove } from "./rook_move.ts";

export function createMoves(piece: Piece): Move {
  switch (piece.type) {
    case "rook":
      return new RookMove(piece);
    case "knight":
      return new KnightMove(piece);
    case "pawn":
      return new PawnMove(piece);
    case "king":
      return new KingMoves(piece);
    case "queen":
      return new QueenMove(piece);
    case "bishop":
      return new BishopMove(piece);
  }
}
