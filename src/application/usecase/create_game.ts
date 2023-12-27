import { PieceData } from "../../domain/piece.ts";
import { GameData } from "../../game.ts";

type Output = { data: GameData };

export function createGame(): Output {
  const pieces = [...createWhitePieces(), ...createBlackPieces()];
  const round = 0;
  const turn = "white";
  return {
    data: {
      capturedPieces: [],
      pieces,
      round,
      turn,
    },
  };
}

function createWhitePieces(): PieceData[] {
  return [
    { cell: "a1", team: "white", moveCount: 0, type: "rook" },
    { cell: "b1", team: "white", moveCount: 0, type: "knight" },
    { cell: "c1", team: "white", moveCount: 0, type: "bishop" },
    { cell: "d1", team: "white", moveCount: 0, type: "queen" },
    { cell: "e1", team: "white", moveCount: 0, type: "king" },
    { cell: "f1", team: "white", moveCount: 0, type: "bishop" },
    { cell: "g1", team: "white", moveCount: 0, type: "knight" },
    { cell: "h1", team: "white", moveCount: 0, type: "rook" },
    { cell: "a2", team: "white", moveCount: 0, type: "pawn" },
    { cell: "b2", team: "white", moveCount: 0, type: "pawn" },
    { cell: "c2", team: "white", moveCount: 0, type: "pawn" },
    { cell: "d2", team: "white", moveCount: 0, type: "pawn" },
    { cell: "e2", team: "white", moveCount: 0, type: "pawn" },
    { cell: "f2", team: "white", moveCount: 0, type: "pawn" },
    { cell: "g2", team: "white", moveCount: 0, type: "pawn" },
    { cell: "h2", team: "white", moveCount: 0, type: "pawn" },
  ];
}

function createBlackPieces(): PieceData[] {
  return [
    { cell: "a8", team: "black", moveCount: 0, type: "rook" },
    { cell: "b8", team: "black", moveCount: 0, type: "knight" },
    { cell: "c8", team: "black", moveCount: 0, type: "bishop" },
    { cell: "d8", team: "black", moveCount: 0, type: "queen" },
    { cell: "e8", team: "black", moveCount: 0, type: "king" },
    { cell: "f8", team: "black", moveCount: 0, type: "bishop" },
    { cell: "g8", team: "black", moveCount: 0, type: "knight" },
    { cell: "h8", team: "black", moveCount: 0, type: "rook" },
    { cell: "a7", team: "black", moveCount: 0, type: "pawn" },
    { cell: "b7", team: "black", moveCount: 0, type: "pawn" },
    { cell: "c7", team: "black", moveCount: 0, type: "pawn" },
    { cell: "d7", team: "black", moveCount: 0, type: "pawn" },
    { cell: "e7", team: "black", moveCount: 0, type: "pawn" },
    { cell: "f7", team: "black", moveCount: 0, type: "pawn" },
    { cell: "g7", team: "black", moveCount: 0, type: "pawn" },
    { cell: "h7", team: "black", moveCount: 0, type: "pawn" },
  ];
}
