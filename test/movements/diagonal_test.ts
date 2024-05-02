import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { Board } from "@/domain/board.ts";
import { Diagonal } from "@/domain/movement/diagonal.ts";
import { map } from "@/generator.ts";
import { Position } from "@/domain/position.ts";
import { toSetCell } from "../helpers/helpers.ts";
import { diagonalData } from "../helpers/diagonal_data.ts";

describe("Generate positions", () => {
  for (const [cell, expectedResult] of diagonalData()) {
    it(`Should generate both: ${cell}`, () => {
      const board = Board.restore([
        { cell, moveCount: 0, team: "black", type: "bishop" },
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const movement = new Diagonal(board, piece, false, {});
      const result = toSetCell(movement.execute());
      assertEquals(result, new Set(expectedResult));
    });

    it(`Should generate bottom: ${cell}`, () => {
      const position = Position.fromCell(cell);
      const bottomExpectedResult = new Set(
        expectedResult.filter((s) => Position.fromCell(s).y > position.y),
      );

      const board = Board.restore([
        { cell, moveCount: 0, team: "black", type: "bishop" },
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const movement = new Diagonal(board, piece, false, {
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
        { cell, moveCount: 0, team: "black", type: "bishop" },
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const movement = new Diagonal(board, piece, false, {
        direction: "top",
      });

      const result = toSetCell(movement.execute());
      assertEquals(result, topExpectedResult);
    });
  }
});

Deno.test("Should take quantity", () => {
  const board = Board.restore([
    { cell: "a1", moveCount: 0, team: "black", type: "knight" },
  ]);

  const piece = board.get(Position.fromCell("a1"))!;

  const expectedResult = new Set(["b2", "c3", "d4"]);
  const movement = new Diagonal(board, piece, false, { take: 3 });
  const result = new Set(map(movement.execute(), (s) => s.toCell()));
  assertEquals(result, expectedResult);
});

Deno.test("Should change acceptance", () => {
  const board = Board.restore([
    { cell: "a1", moveCount: 0, team: "black", type: "knight" },
    { cell: "d4", moveCount: 0, team: "black", type: "knight" },
  ]);

  const piece = board.get(Position.fromCell("a1"))!;

  let next = false;
  const expectedResult = new Set(["b2", "c3", "d4", "e5"]);
  const movement = new Diagonal(board, piece, false, {
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
