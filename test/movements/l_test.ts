import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { L } from "../../src/domain/movement/l.ts";
import { Board } from "../../src/domain/board.ts";
import { Position } from "../../src/domain/position.ts";
import { lData } from "../helpers/l_data.ts";
import { fakePieceData, toSetCell } from "../helpers/helpers.ts";
import { describe, it } from "https://deno.land/std@0.202.0/testing/bdd.ts";

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
