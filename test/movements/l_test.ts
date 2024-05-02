import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { Board } from "@/domain/board.ts";
import { L } from "@/domain/movement/l.ts";
import { Position } from "@/domain/position.ts";
import { lData } from "../helpers/l_data.ts";
import { fakePieceData, toSetCell } from "../helpers/helpers.ts";

describe("Generate positions", () => {
  for (const [cell, output] of lData()) {
    it(`Should generate L positions: ${cell}`, () => {
      const expected = new Set(output);

      const board = Board.restore([
        fakePieceData({ cell }),
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const movement = new L(board, piece, false);
      const result = toSetCell(movement.execute());
      assertEquals(result, expected);
    });
  }
});

Deno.test("Should generate enemy piece position", () => {
  const expected = new Set(["b5", "c2", "b1", "c4"]);

  const board = Board.restore([
    fakePieceData({ cell: "a3", team: "black" }),
    fakePieceData({ cell: "c4", team: "white" }),
  ]);

  const piece = board.get(Position.fromCell("a3"))!;
  const movement = new L(board, piece, false);

  const result = toSetCell(movement.execute());
  assertEquals(result, expected);
});

Deno.test("Should not generate ally piece position", () => {
  const expected = new Set(["b5", "c2", "b1"]);

  const board = Board.restore([
    fakePieceData({ cell: "a3", team: "black" }),
    fakePieceData({ cell: "c4", team: "black" }),
  ]);

  const piece = board.get(Position.fromCell("a3"))!;
  const movement = new L(board, piece, false);

  const result = toSetCell(movement.execute());
  assertEquals(result, expected);
});
