import {
  assert,
  assertEquals,
  assertNotStrictEquals,
} from "https://deno.land/std@0.208.0/assert/mod.ts";
import { lData } from "../helpers/l_data.ts";
import { fakePieceData, toSetCell } from "../helpers/helpers.ts";
import { Board } from "../../src/domain/board.ts";
import { Position } from "../../src/domain/position.ts";
import { describe, it } from "https://deno.land/std@0.202.0/testing/bdd.ts";

describe("Knight positions", () => {
  for (const [cell, output] of lData()) {
    it(`Should generate: ${cell}`, () => {
      const expected = new Set(output);

      const increment = Position.fromCell(cell).x > 0 ? { x: -1 } : { x: 1 };
      const position = Position.increment(Position.fromCell(cell), increment);
      assert(position.ok);
      const kingCell = position.data.toCell();

      const board = Board.restore([
        fakePieceData({ cell: kingCell, type: "king" }),
        fakePieceData({ cell, type: "knight" }),
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const result = toSetCell(piece.moves());

      assertEquals(result, expected);
    });
  }
});

Deno.test("Should clone", () => {
  const board = Board.restore([
    fakePieceData({ cell: "a1", type: "knight" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;

  const clonedPiece = board.clone().get(Position.fromCell("a1"))!;

  assertNotStrictEquals(piece, clonedPiece);
});
