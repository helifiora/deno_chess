import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { Horizontal } from "../../src/domain/movement/horizontal.ts";
import { horizontalData } from "../helpers/horizontal_data.ts";
import { Board } from "../../src/domain/board.ts";
import { Position } from "../../src/domain/position.ts";
import { fakePieceData, toSetCell } from "../helpers/helpers.ts";
import { describe, it } from "https://deno.land/std@0.202.0/testing/bdd.ts";

describe("Generate positions", () => {
  for (const [cell, expectedResult] of horizontalData()) {
    it(`Should generate horizontal positions: ${cell}`, () => {
      const board = Board.restore([
        fakePieceData({ cell }),
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const movement = new Horizontal(board, piece, false, {});
      const result = toSetCell(movement.execute());
      assertEquals(result, new Set(expectedResult));
    });
  }
});

Deno.test("Should take quantity", () => {
  const board = Board.restore([
    fakePieceData({ cell: "a1" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;

  const expectedResult = new Set(["b1", "c1", "d1"]);
  const movement = new Horizontal(board, piece, false, { take: 3 });
  const result = toSetCell(movement.execute());
  assertEquals(result, expectedResult);
});

Deno.test("Should change acceptance", () => {
  const board = Board.restore([
    fakePieceData({ cell: "a1", team: "black" }),
    fakePieceData({ cell: "d1", team: "black" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;

  let next = false;
  const expectedResult = new Set(["b1", "c1", "d1", "e1"]);
  const movement = new Horizontal(board, piece, false, {
    acceptance: (target) => {
      if (next) {
        return "last";
      }

      if (target.piece === null) {
        return "next";
      }

      if (target.piece.hasSameTeam(piece)) {
        next = true;
        return "next";
      }

      return "stop";
    },
  });

  const result = toSetCell(movement.execute());
  assertEquals(result, expectedResult);
});
