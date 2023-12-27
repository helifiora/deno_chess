import type { AcceptanceFn } from "./acceptance.ts";
import type { Position } from "../position.ts";
import type { Piece, PieceType } from "../piece.ts";
import { toDirection } from "../direction.ts";
import { MovementBuilder } from "./builder.ts";

type MoveFactory = (piece: Piece, verifyCheck: boolean) => Generator<Position>;

const createRookMoves: MoveFactory = (piece, verifyCheck) => {
  return new MovementBuilder(piece.board, piece, verifyCheck)
    .addHorizontal()
    .addVertical()
    .build();
};

const createQueenMoves: MoveFactory = (piece, verify) => {
  return new MovementBuilder(piece.board, piece, verify)
    .addDiagonal()
    .addVertical()
    .addHorizontal()
    .build();
};

const createBishopMoves: MoveFactory = (piece, verify) => {
  return new MovementBuilder(piece.board, piece, verify)
    .addDiagonal()
    .build();
};

const createKnightMoves: MoveFactory = (piece, verify) => {
  return new MovementBuilder(piece.board, piece, verify)
    .addL()
    .build();
};

const createPawnMoves: MoveFactory = (piece, verify) => {
  const direction = toDirection(piece.team);

  const verticalTake = piece.moveCount === 0 ? 2 : 1;

  const verticalAcceptance: AcceptanceFn = (target) => {
    return piece.board.isEmpty(target) ? "next" : "stop";
  };

  const diagonalAcceptance: AcceptanceFn = (target) => {
    const targetPiece = piece.board.get(target);
    if (targetPiece === null || targetPiece.hasSameTeam(piece)) {
      return "stop";
    }

    return "next";
  };

  return new MovementBuilder(piece.board, piece, verify)
    .addVertical({
      acceptance: verticalAcceptance,
      direction,
      take: verticalTake,
    })
    .addDiagonal({
      acceptance: diagonalAcceptance,
      direction,
      take: 1,
    })
    .build();
};

const createKingMoves: MoveFactory = (piece, verify) => {
  return new MovementBuilder(piece.board, piece, verify)
    .addDiagonal({ take: 1 })
    .addHorizontal({ take: 1 })
    .addVertical({ take: 1 })
    .build();
};

const moveMap: Record<PieceType, MoveFactory> = {
  rook: createRookMoves,
  bishop: createBishopMoves,
  king: createKingMoves,
  knight: createKnightMoves,
  pawn: createPawnMoves,
  queen: createQueenMoves,
};

export const moves: MoveFactory = (piece, verify) => {
  return moveMap[piece.type](piece, verify);
};
