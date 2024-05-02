import { assert, assertEquals, assertNotStrictEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { Board } from "@/domain/board.ts";
import { Position } from "@/domain/position.ts";
import { fakePieceData, toSetCell } from "../helpers/helpers.ts";
import { lData } from "../helpers/l_data.ts";

describe("Knight positions", () => {
  for (const [cell, output] of lData()) {
    it(`Should generate: ${cell}`, () => {
      const expected = new Set(output);

      const increment = Position.fromCell(cell).x > 0 ? { x: -1 } : { x: 1 };
      const position = Position.increment(Position.fromCell(cell), increment);
      assert(position.isOk());
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
