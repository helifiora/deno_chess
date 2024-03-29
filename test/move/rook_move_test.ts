import { assert, assertEquals, assertNotStrictEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { Board } from "@/domain/board.ts";
import { Cell } from "@/domain/cell.ts";
import { Position } from "@/domain/position.ts";
import { fakePieceData, generateValidCell, toSetCell } from "../helpers/helpers.ts";
import { horizontalData } from "../helpers/horizontal_data.ts";
import { verticalData } from "../helpers/vertical_data.ts";

const data = (): [Cell, Cell[]][] => {
  const horizontalMap = new Map(horizontalData());
  const verticalMap = new Map(verticalData());
  const resultMap = new Map<Cell, Cell[]>([]);
  for (const cell of generateValidCell()) {
    const valueHorizontal = horizontalMap.get(cell)!;
    const valueVertical = verticalMap.get(cell)!;
    resultMap.set(cell, [...valueHorizontal, ...valueVertical]);
  }

  return Array.from(resultMap.entries());
};

describe("Rook positions", () => {
  for (const [cell, output] of data()) {
    it(`Should generate: ${cell}`, () => {
      const expected = new Set(output);

      const originPosition = Position.fromCell(cell);
      const incrementX = originPosition.x > 0 ? -1 : 1;
      const incrementY = originPosition.y > 0 ? -1 : 1;
      const increment = { x: incrementX, y: incrementY };

      const kingPosition = Position.increment(
        Position.fromCell(cell),
        increment,
      );

      assert(kingPosition.ok);
      const kingCell = kingPosition.data.toCell();

      const board = Board.restore([
        fakePieceData({ cell: kingCell, type: "king" }),
        fakePieceData({ cell, type: "rook" }),
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const result = toSetCell(piece.moves());

      assertEquals(result, expected);
    });
  }
});

Deno.test("Should include enemies", () => {
  const expected = new Set<Cell>(["a2", "a3", "a4", "a5", "b1", "c1"]);

  const board = Board.restore([
    fakePieceData({ cell: "h3", team: "black", type: "king" }),
    fakePieceData({ cell: "a1", team: "black", type: "rook" }),
    fakePieceData({ cell: "a5", team: "white", type: "bishop" }),
    fakePieceData({ cell: "c1", team: "white", type: "bishop" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;
  const result = toSetCell(piece.moves());

  assertEquals(result, expected);
});

Deno.test("Should not include allies", () => {
  const expected = new Set(["a2", "a3", "a4"]);

  const board = Board.restore([
    fakePieceData({ cell: "h3", team: "black", type: "king" }),
    fakePieceData({ cell: "a1", team: "black", type: "rook" }),
    fakePieceData({ cell: "a5", team: "black", type: "bishop" }),
    fakePieceData({ cell: "b1", team: "black", type: "bishop" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;
  const result = toSetCell(piece.moves());

  assertEquals(result, expected);
});

Deno.test("Should clone", () => {
  const board = Board.restore([
    fakePieceData({ cell: "a1", type: "rook" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;

  const clonedPiece = board.clone().get(Position.fromCell("a1"))!;

  assertNotStrictEquals(piece, clonedPiece);
});
