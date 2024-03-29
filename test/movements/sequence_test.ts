import { beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { Sequence } from "@/domain/movement/sequence.ts";
import { Board } from "@/domain/board.ts";
import { Cell } from "@/domain/cell.ts";
import { merge } from "@/generator.ts";
import { Piece } from "@/domain/piece.ts";
import { Position } from "@/domain/position.ts";
import { fakePieceData, toSetCell } from "../helpers/helpers.ts";

class SequenceImp extends Sequence {
  execute(): Generator<Position> {
    return this.sequence({ x: 1 });
  }
}

class Sequence2Imp extends Sequence {
  execute(): Generator<Position> {
    return merge(this.sequence({ x: -1 }), this.sequence({ x: 1 }));
  }
}

describe("Sequence.sequence", () => {
  let board: Board;
  let piece: Piece;

  beforeEach(() => {
    board = Board.restore([
      fakePieceData({ cell: "b4" }),
    ]);

    piece = board.get(Position.fromCell("b4"))!;
  });

  it("Should generate right", () => {
    const expectedResult = new Set(["c4", "d4", "e4", "f4", "g4", "h4"]);

    const imp = new SequenceImp(board, piece, false, {});

    const result = toSetCell(imp.sequence({ x: 1 }));

    assertEquals(result, expectedResult);
  });

  it("Should generate but take quantity", () => {
    const expectedResult = new Set(["c4", "d4", "e4"]);

    const imp = new SequenceImp(board, piece, false, { take: 3 });

    const result = toSetCell(imp.sequence({ x: 1 }));

    assertEquals(result, expectedResult);
  });
});

describe("Sequence.execute", () => {
  let board: Board;

  beforeEach(() => {
    board = Board.restore([
      { cell: "b4", moveCount: 0, team: "black", type: "knight" },
      { cell: "e4", moveCount: 0, team: "white", type: "knight" },
      { cell: "a3", moveCount: 0, team: "white", type: "knight" },
      { cell: "c3", moveCount: 0, team: "white", type: "knight" },
    ]);
  });

  it("Should use default acceptance (include enemy)", () => {
    const expectedResult = new Set(["c4", "d4", "e4"]);

    const piece = board.get(Position.fromCell("b4"))!;

    const imp = new SequenceImp(board, piece, false, {});

    const result = toSetCell(imp.execute());

    assertEquals(result, expectedResult);
  });

  it("Should use deffault acceptance (exclude ally)", () => {
    const expectedResult = new Set(["b3"]);
    const piece = board.get(Position.fromCell("a3"))!;

    const imp = new SequenceImp(board, piece, false, {});
    const result = toSetCell(imp.execute());
    assertEquals(result, expectedResult);
  });

  it("Should use custom acceptance", () => {
    const expectedResult = new Set(["b3", "c3"]);
    const piece = board.get(Position.fromCell("a3"))!;

    const imp = new SequenceImp(board, piece, false, {
      acceptance: (target) => {
        if (target.piece === null) {
          return "next";
        }

        if (target.piece.hasSameTeam(piece)) {
          return "last";
        }

        return "stop";
      },
    });

    const result = toSetCell(imp.execute());
    assertEquals(result, expectedResult);
  });
});

Deno.test("Should acceptance apply to each sequence and not to merged sequences", () => {
  const expectedResult = new Set<Cell>(["c3", "d3", "e3", "a3"]);

  const board = Board.restore([
    { cell: "b3", moveCount: 0, team: "white", type: "knight" },
    { cell: "e3", moveCount: 0, team: "black", type: "knight" },
  ]);

  const piece = board.get(Position.fromCell("b3"))!;

  const imp = new Sequence2Imp(board, piece, false, {});
  const result = toSetCell(imp.execute());
  assertEquals(result, expectedResult);
});
