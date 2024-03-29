import { assert, assertEquals, assertFalse, assertStrictEquals } from "@std/assert";
import { fakePieceData } from "./helpers/helpers.ts";
import { Board } from "@/domain/board.ts";
import { Position } from "@/domain/position.ts";
import { Piece } from "@/domain/piece.ts";

Deno.test("Should Piece.board return board", () => {
  const board = Board.empty();
  const piece = Piece.fromData(board, fakePieceData({ cell: "a1" }));
  assertStrictEquals(piece.board, board);
});

Deno.test("Should Piece.team return team", () => {
  const piece = Piece.fromData(
    Board.empty(),
    fakePieceData({ cell: "a1", team: "black" }),
  );

  assertStrictEquals(piece.team, "black");
});

Deno.test("Should Piece.moveCount return moveCount", () => {
  const piece = Piece.fromData(
    Board.empty(),
    fakePieceData({ cell: "a1", moveCount: 6 }),
  );

  assertStrictEquals(piece.moveCount, 6);
});

Deno.test("Should Piece.position return position", () => {
  const piece = Piece.fromData(
    Board.empty(),
    fakePieceData({ cell: "a1" }),
  );

  assert(piece.position.equals(Position.fromCell("a1")));
});

Deno.test("Should Piece.hasSameTeam verify if two pieces has same team", () => {
  const piece = Piece.fromData(
    Board.empty(),
    fakePieceData({ cell: "a1", team: "white" }),
  );

  const piece2 = Piece.fromData(
    Board.empty(),
    fakePieceData({ cell: "a2", team: "white" }),
  );

  const piece3 = Piece.fromData(
    Board.empty(),
    fakePieceData({ cell: "a3", team: "black" }),
  );

  assert(piece.hasSameTeam(piece2));
  assertFalse(piece.hasSameTeam(piece3));
});

Deno.test("Should Piece.toData transform to PieceData", () => {
  const piece = Piece.fromData(
    Board.empty(),
    fakePieceData({
      cell: "a3",
      team: "black",
      moveCount: 6,
      type: "knight",
    }),
  );

  assertEquals(piece.toData(), {
    cell: "a3",
    team: "black",
    moveCount: 6,
    type: "knight",
  });
});

Deno.test("Should Piece.isInEnemyMove verify if enemies can move to it position", () => {
  const board = Board.restore([
    fakePieceData({ cell: "a1", team: "black", type: "pawn" }),
    fakePieceData({ cell: "c4", team: "black", type: "pawn" }),
    fakePieceData({ cell: "a8", team: "white", type: "rook" }),
  ]);

  const pieceInDanger = board.get(Position.fromCell("a1"))!;
  const pieceNotInDanger = board.get(Position.fromCell("c4"))!;

  assert(pieceInDanger.isInEnemyMove());
  assertFalse(pieceNotInDanger.isInEnemyMove());
});
