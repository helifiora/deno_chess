import {
  assert,
  assertEquals,
  assertFalse,
  assertNotStrictEquals,
} from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";

import { Board } from "@/domain/board.ts";
import { filter, map } from "@/generator.ts";
import { PieceData } from "@/domain/piece/piece.ts";
import { Position } from "@/domain/position.ts";
import { Cell } from "@/domain/cell.ts";

describe("Board.pieces", () => {
  let data: Map<Cell, PieceData>;
  let board: Board;

  beforeEach(() => {
    data = new Map([
      ["a8", { cell: "a8", moveCount: 0, team: "white", type: "queen" }],
      ["b2", { cell: "b2", moveCount: 0, team: "white", type: "queen" }],
      ["c5", { cell: "c5", moveCount: 0, team: "white", type: "queen" }],
      ["d4", { cell: "d4", moveCount: 0, team: "white", type: "queen" }],
      ["e6", { cell: "e6", moveCount: 0, team: "black", type: "queen" }],
      ["h2", { cell: "h2", moveCount: 0, team: "black", type: "queen" }],
      ["a4", { cell: "a4", moveCount: 0, team: "black", type: "queen" }],
    ]);

    board = Board.restore(Array.from(data.values()));
  });

  it("Should generate all pieces", () => {
    const visitedCells = new Set<Cell>();

    for (const piece of board.pieces()) {
      const cell = piece.position.toCell();
      const dataValue = data.get(cell);
      assert(dataValue);
      assertEquals(piece.toData(), dataValue);
      visitedCells.add(cell);
    }

    const expectedResult = new Set(data.keys());
    assertEquals(visitedCells, expectedResult);
  });

  it("Should generate all black pieces", () => {
    const visitedCells = new Set<Cell>();

    for (const piece of board.pieces("black")) {
      const cell = piece.position.toCell();
      const dataValue = data.get(cell);
      assert(dataValue);
      assertEquals(piece.toData(), dataValue);
      visitedCells.add(cell);
    }

    const filtered = filter(data.values(), (s) => s.team === "black");
    const mapped = map(filtered, (s) => s.cell);
    const expectedResult = new Set(mapped);
    assertEquals(visitedCells, expectedResult);
  });

  it("Should generate all white pieces", () => {
    const visitedCells = new Set<Cell>();

    for (const piece of board.pieces("white")) {
      const cell = piece.position.toCell();
      const dataValue = data.get(cell);
      assert(dataValue);
      assertEquals(piece.toData(), dataValue);
      visitedCells.add(cell);
    }

    const filtered = filter(data.values(), (s) => s.team === "white");
    const mapped = map(filtered, (s) => s.cell);
    const expectedResult = new Set(mapped);
    assertEquals(visitedCells, expectedResult);
  });
});

describe("Board.positions", () => {
  let data: Map<Cell, PieceData>;
  let board: Board;

  beforeEach(() => {
    data = new Map([
      ["a8", { cell: "a8", moveCount: 0, team: "white", type: "queen" }],
      ["b2", { cell: "b2", moveCount: 0, team: "white", type: "queen" }],
      ["c5", { cell: "c5", moveCount: 0, team: "white", type: "queen" }],
      ["d4", { cell: "d4", moveCount: 0, team: "white", type: "queen" }],
      ["e6", { cell: "e6", moveCount: 0, team: "black", type: "queen" }],
      ["h2", { cell: "h2", moveCount: 0, team: "black", type: "queen" }],
      ["a4", { cell: "a4", moveCount: 0, team: "black", type: "queen" }],
    ]);

    board = Board.restore(Array.from(data.values()));
  });

  it("Should generate all positions", () => {
    const visitedCells = new Set<Cell>();

    for (const position of board.positions()) {
      const piece = board.get(position);
      const dataPiece = data.get(position.toCell()) ?? null;
      if (dataPiece === null) {
        assert(piece === null);
      } else {
        assert(piece);
        assertEquals(piece.toData(), dataPiece);
        visitedCells.add(position.toCell());
      }
    }

    assertEquals(visitedCells.size, data.size);
  });
});

describe("Board.empty", () => {
  let board: Board;

  beforeEach(() => {
    board = Board.empty();
  });

  it("Should create and verify with (pieces)", () => {
    const result = Array.from(board.pieces());
    assertEquals(result.length, 0);
  });

  it("Should create and verify with (positions)", () => {
    const result = Array.from(board.positions(), (s) => board.get(s))
      .filter((s) => s !== null);

    assertEquals(result.length, 0);
  });
});

describe("Board.get", () => {
  let board: Board;

  beforeEach(() => {
    board = Board.restore([
      { cell: "b2", moveCount: 0, team: "black", type: "pawn" },
    ]);
  });

  it("Should return null when position is empty", () => {
    const result = board.get(Position.fromCell("c2"));
    assert(result === null);
  });

  it("Should return piece when position is occupied", () => {
    const result = board.get(Position.fromCell("b2"));
    assert(result);
    assertEquals(result.toData(), {
      cell: "b2",
      moveCount: 0,
      team: "black",
      type: "pawn",
    });
  });
});

describe("Board.isEmpty", () => {
  let board: Board;

  beforeEach(() => {
    board = Board.restore([
      { cell: "a1", moveCount: 0, team: "white", type: "knight" },
    ]);
  });

  it("Should verify if board position is empty", () => {
    assert(board.isEmpty(Position.fromCell("a2")));
    assertFalse(board.isEmpty(Position.fromCell("a1")));
  });
});

describe("Board.isOccupied", () => {
  let board: Board;

  beforeEach(() => {
    board = Board.restore([
      { cell: "a1", moveCount: 0, team: "white", type: "knight" },
    ]);
  });

  it("Should verify if board position is occupied", () => {
    assert(board.isOccupied(Position.fromCell("a1")));
    assertFalse(board.isOccupied(Position.fromCell("a2")));
  });
});

describe("Board.clone", () => {
  let board: Board;

  beforeEach(() => {
    board = Board.restore([
      { cell: "a5", team: "black", moveCount: 0, type: "knight" },
      { cell: "a6", team: "black", moveCount: 0, type: "bishop" },
    ]);
  });

  it("Should clone board and pieces", () => {
    const p1 = board.get(Position.fromCell("a5"))!;
    const p2 = board.get(Position.fromCell("a6"))!;
    const cloned = board.clone();
    const clonedP1 = cloned.get(Position.fromCell("a5"))!;
    const clonedP2 = cloned.get(Position.fromCell("a6"))!;
    assertNotStrictEquals(board, cloned);
    assertNotStrictEquals(clonedP1, p1);
    assertNotStrictEquals(clonedP2, p2);
    p1.position = new Position(4, 4);
    assertFalse(clonedP1.position.equals(p1.position));
  });
});

describe("Board.move", () => {
  let board: Board;

  beforeEach(() => {
    board = Board.restore([
      { cell: "a8", moveCount: 0, team: "white", type: "knight" },
      { cell: "c5", moveCount: 5, team: "black", type: "rook" },
    ]);
  });

  it("Should move to an empty position", () => {
    const piece = board.get(Position.fromCell("a8"))!;
    const result = board.move(piece, Position.fromCell("c8"));
    assert(result === null);
    assertEquals(piece.position.toCell(), "c8");
    assert(board.isOccupied(Position.fromCell("c8")));
    assert(board.isEmpty(Position.fromCell("a8")));
  });

  it("Should move to an occupied position", () => {
    const piece = board.get(Position.fromCell("a8"))!;
    const result = board.move(piece, Position.fromCell("c5"));
    assertEquals(result?.moveCount, 5);
    assertEquals(result?.team, "black");
    assertEquals(result?.type, "rook");
    assertEquals(piece.position.toCell(), "c5");
    assert(board.isOccupied(Position.fromCell("c5")));
    assert(board.isEmpty(Position.fromCell("a8")));
  });
});

describe("Board.restore", () => {
  it("Should restore pieceData", () => {
    const board = Board.restore([
      { cell: "b2", moveCount: 1, team: "black", type: "knight" },
    ]);

    const piece = board.get(Position.fromCell("b2"));
    assert(piece);

    assertEquals(piece.toData(), {
      cell: "b2",
      moveCount: 1,
      team: "black",
      type: "knight",
    });
  });
});
