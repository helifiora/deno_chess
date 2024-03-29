import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { Vertical } from "@/domain/movement/vertical.ts";
import { Board } from "@/domain/board.ts";
import { Position } from "@/domain/position.ts";
import { verticalData } from "../helpers/vertical_data.ts";
import { fakePieceData, toSetCell } from "../helpers/helpers.ts";

describe("Generate positions", () => {
  for (const [cell, expectedResult] of verticalData()) {
    it(`Should generate both: ${cell}`, () => {
      const board = Board.restore([
        fakePieceData({ cell }),
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const movement = new Vertical(board, piece, false, {});
      const result = toSetCell(movement.execute());
      assertEquals(result, new Set(expectedResult));
    });

    it(`Should generate bottom: ${cell}`, () => {
      const position = Position.fromCell(cell);
      const bottomExpectedResult = new Set(
        expectedResult.filter((s) => Position.fromCell(s).y > position.y),
      );

      const board = Board.restore([
        fakePieceData({ cell }),
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const movement = new Vertical(board, piece, false, {
        direction: "bottom",
      });

      const result = toSetCell(movement.execute());
      assertEquals(result, bottomExpectedResult);
    });

    it(`Should generate top: ${cell}`, () => {
      const position = Position.fromCell(cell);
      const topExpectedResult = new Set(
        expectedResult.filter((s) => Position.fromCell(s).y < position.y),
      );

      const board = Board.restore([
        fakePieceData({ cell }),
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const movement = new Vertical(board, piece, false, {
        direction: "top",
      });

      const result = toSetCell(movement.execute());
      assertEquals(result, topExpectedResult);
    });
  }
});

Deno.test("Should take quantity", () => {
  const board = Board.restore([
    fakePieceData({ cell: "a1" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;

  const expectedResult = new Set(["a2", "a3", "a4"]);
  const movement = new Vertical(board, piece, false, { take: 3 });
  const result = toSetCell(movement.execute());
  assertEquals(result, expectedResult);
});

Deno.test("Should change acceptance", () => {
  const board = Board.restore([
    fakePieceData({ cell: "a1", team: "black" }),
    fakePieceData({ cell: "a4", team: "black" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;

  let next = false;
  const expectedResult = new Set(["a2", "a3", "a4", "a5"]);
  const movement = new Vertical(board, piece, false, {
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
