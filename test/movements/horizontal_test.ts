import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { Horizontal } from "@/domain/movement/horizontal.ts";
import { Board } from "@/domain/board.ts";
import { Position } from "@/domain/position.ts";
import { horizontalData } from "../helpers/horizontal_data.ts";
import { fakePieceData, toSetCell } from "../helpers/helpers.ts";

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
