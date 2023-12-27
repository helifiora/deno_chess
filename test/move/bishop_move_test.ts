import { fakePieceData, toSetCell } from "../helpers/helpers.ts";
import {
  assert,
  assertEquals,
  assertNotStrictEquals,
} from "https://deno.land/std@0.202.0/assert/mod.ts";
import { diagonalData } from "../helpers/diagonal_data.ts";
import { Board } from "../../src/domain/board.ts";
import { Cell } from "../../src/domain/cell.ts";
import { Position } from "../../src/domain/position.ts";
import { describe, it } from "https://deno.land/std@0.202.0/testing/bdd.ts";

describe("Bishop positions", () => {
  for (const [cell, output] of diagonalData()) {
    it(`Should generate: ${cell}`, () => {
      const expected = new Set(output);

      const increment = Position.fromCell(cell).x > 0 ? { x: -1 } : { x: 1 };
      const position = Position.increment(Position.fromCell(cell), increment);
      assert(position.ok);
      const kingCell = position.data.toCell();

      const board = Board.restore([
        fakePieceData({ cell, type: "bishop" }),
        fakePieceData({ cell: kingCell, type: "king" }),
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const result = toSetCell(piece.moves());

      assertEquals(result, expected);
    });
  }
});

Deno.test("Should include enemies", () => {
  const expected = new Set<Cell>(["c3", "d4", "a3", "a1", "c1"]);

  const board = Board.restore([
    fakePieceData({ cell: "a2", team: "black", type: "king" }),
    fakePieceData({ cell: "b2", team: "black", type: "bishop" }),
    fakePieceData({ cell: "d4", team: "white" }),
  ]);

  const piece = board.get(Position.fromCell("b2"))!;
  const result = toSetCell(piece.moves());

  assertEquals(result, expected);
});

Deno.test("Should not include allies", () => {
  const expected = new Set<Cell>(["c3", "a3", "a1", "c1"]);

  const board = Board.restore([
    fakePieceData({ cell: "a2", team: "black", type: "king" }),
    fakePieceData({ cell: "b2", team: "black", type: "bishop" }),
    fakePieceData({ cell: "d4", team: "black" }),
  ]);

  const piece = board.get(Position.fromCell("b2"))!;
  const result = toSetCell(piece.moves());

  assertEquals(result, expected);
});

Deno.test("Should clone", () => {
  const board = Board.restore([
    fakePieceData({ cell: "a1", type: "bishop" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;

  const clonedPiece = board.clone().get(Position.fromCell("a1"))!;

  assertNotStrictEquals(piece, clonedPiece);
});
