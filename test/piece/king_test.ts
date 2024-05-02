import { assertEquals, assertNotStrictEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { Board } from "@/domain/board.ts";
import { Cell } from "@/domain/cell.ts";
import { merge, take } from "@/generator.ts";
import { Position, PositionIncrement } from "@/domain/position.ts";
import {
  createSequence,
  fakePieceData,
  generateValidCell,
  toSetCell,
} from "../helpers/helpers.ts";

function toExpected(origin: Position): Set<Cell> {
  const increments: PositionIncrement[] = [
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: -1 },
    { x: -1, y: 1 },
    { x: 1 },
    { x: -1 },
    { y: 1 },
    { y: -1 },
  ];

  const generators = increments.map((i) => take(createSequence(origin, i), 1));

  return toSetCell(merge(...generators));
}

describe("King positions", () => {
  for (const cell of generateValidCell()) {
    it(`Should generate: ${cell}`, () => {
      const expected = toExpected(Position.fromCell(cell));

      const board = Board.restore([
        fakePieceData({ cell, type: "king" }),
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const result = toSetCell(piece.moves());
      assertEquals(result, expected);
    });
  }
});

Deno.test("Should include enemy position, if move does not cause check", () => {
  const expected = new Set<Cell>(["a2", "b1", "b2"]);

  const board = Board.restore([
    fakePieceData({ cell: "a1", team: "black", type: "king" }),
    fakePieceData({ cell: "a2", team: "white", type: "pawn" }),
    fakePieceData({ cell: "a4", team: "white", type: "bishop" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;
  const result = toSetCell(piece.moves());

  assertEquals(result, expected);
});

Deno.test("Should not include enemy position, if move causes check", () => {
  const expected = new Set<Cell>(["b1", "b2"]);

  const board = Board.restore([
    fakePieceData({ cell: "a1", team: "black", type: "king" }),
    fakePieceData({ cell: "a2", team: "white", type: "pawn" }),
    fakePieceData({ cell: "a4", team: "white", type: "rook" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;
  const result = toSetCell(piece.moves());

  assertEquals(result, expected);
});

Deno.test("Should enemies moves block movimentation", () => {
  const expected = new Set<Cell>(["a2"]);

  const board = Board.restore([
    fakePieceData({ cell: "a1", team: "black", type: "king" }),
    fakePieceData({ cell: "c1", team: "white", type: "king" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;
  const result = toSetCell(piece.moves());

  assertEquals(result, expected);
});

Deno.test("Should king has no moves when enemies block all movimentation", () => {
  const board = Board.restore([
    fakePieceData({ cell: "a1", team: "black", type: "king" }),
    fakePieceData({ cell: "b4", team: "white", type: "rook" }),
    fakePieceData({ cell: "c2", team: "white", type: "rook" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;
  const result = toSetCell(piece.moves(true));

  assertEquals(result, new Set());
});

Deno.test("Should not include ally position", () => {
  const expected = new Set<Cell>(["a2", "b1"]);

  const board = Board.restore([
    fakePieceData({ cell: "a1", team: "black", type: "king" }),
    fakePieceData({ cell: "b2", team: "black" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;
  const result = toSetCell(piece.moves());

  assertEquals(result, expected);
});

Deno.test("Should clone", () => {
  const board = Board.restore([
    fakePieceData({ cell: "a1", type: "king" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;

  const clonedPiece = board.clone().get(Position.fromCell("a1"))!;

  assertNotStrictEquals(piece, clonedPiece);
});
