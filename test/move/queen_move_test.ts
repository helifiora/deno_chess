import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertNotStrictEquals } from "@std/assert";
import { Board } from "@/domain/board.ts";
import { Cell } from "@/domain/cell.ts";
import { Position } from "@/domain/position.ts";
import { Horizontal } from "@/domain/movement/horizontal.ts";
import { Vertical } from "@/domain/movement/vertical.ts";
import { Diagonal } from "@/domain/movement/diagonal.ts";
import { merge, toSet } from "@/generator.ts";
import { fakePieceData, generateValidCell, toSetCell } from "../helpers/helpers.ts";

function toExpected(cell: Cell): Set<Cell> {
  const origin = Position.fromCell(cell);

  const l = Position.sequence(origin, Horizontal.leftIncrement);
  const r = Position.sequence(origin, Horizontal.rightIncrement);

  const t = Position.sequence(origin, Vertical.topIncrement);
  const tl = Position.sequence(origin, Diagonal.topLeftIncrement);
  const tr = Position.sequence(origin, Diagonal.topRightIncrement);

  const b = Position.sequence(origin, Vertical.bottomIncrement);
  const bl = Position.sequence(origin, Diagonal.bottomLeftIncrement);
  const br = Position.sequence(origin, Diagonal.bottomRightIncrement);

  const generators = merge(l, r, t, tl, tr, b, bl, br);

  return toSet(generators, (s) => s.toCell());
}

describe("Queen positions", () => {
  for (const cell of generateValidCell()) {
    it(`Should generate: ${cell}`, () => {
      const expected = toExpected(cell);

      const position = Position.fromCell(cell);
      const ix = (position.x + 2) % (Position.max + 1);
      const iy = (position.y + 5) % (Position.max + 1);

      const kingPosition = new Position(ix, iy);
      const kingCell = kingPosition.toCell();
      const board = Board.restore([
        fakePieceData({ cell: kingCell, type: "king", team: "black" }),
        fakePieceData({ cell, type: "queen", team: "black" }),
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const result = toSetCell(piece.moves());

      assertEquals(result, expected);
    });
  }
});

Deno.test("Should include enemies", () => {
  const expected = new Set<Cell>(["a2", "a3", "a4", "a5", "b1", "c1", "b2"]);

  const board = Board.restore([
    fakePieceData({ cell: "h7", team: "black", type: "king" }),
    fakePieceData({ cell: "a1", team: "black", type: "queen" }),
    fakePieceData({ cell: "b2", team: "white" }),
    fakePieceData({ cell: "a5", team: "white" }),
    fakePieceData({ cell: "c1", team: "white" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;
  const result = toSetCell(piece.moves());

  assertEquals(result, expected);
});

Deno.test("Should not include allies", () => {
  const expected = new Set<Cell>(["a2", "a3", "a4", "b2", "c3"]);

  const board = Board.restore([
    fakePieceData({ cell: "h7", team: "black", type: "king" }),
    fakePieceData({ cell: "a1", team: "black", type: "queen" }),
    fakePieceData({ cell: "d4", team: "black" }),
    fakePieceData({ cell: "a5", team: "black" }),
    fakePieceData({ cell: "b1", team: "black" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;
  const result = toSetCell(piece.moves());

  assertEquals(result, expected);
});

Deno.test("Should clone", () => {
  const board = Board.restore([
    fakePieceData({ cell: "a1", type: "queen" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;

  const clonedPiece = board.clone().get(Position.fromCell("a1"))!;

  assertNotStrictEquals(piece, clonedPiece);
});
