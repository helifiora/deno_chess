import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.202.0/testing/bdd.ts";
import { MovementBuilder } from "../../src/domain/movement/builder.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { AcceptanceFn } from "../../src/domain/movement/acceptance.ts";
import { Board } from "../../src/domain/board.ts";
import { Cell } from "../../src/domain/cell.ts";
import { Piece } from "../../src/domain/piece.ts";
import { Position } from "../../src/domain/position.ts";
import { toSetCell } from "../helpers/helpers.ts";

function testAcceptance(_: Board, piece: Piece): AcceptanceFn {
  return (target) => {
    if (target.piece === null || target.piece.hasSameTeam(piece)) {
      return "next";
    }

    return "stop";
  };
}

describe("Builder.addHorizontal", () => {
  let board: Board;
  let piece: Piece;
  let builder: MovementBuilder;

  beforeEach(() => {
    board = Board.restore([
      { cell: "a1", moveCount: 0, team: "black", type: "bishop" },
      { cell: "g1", moveCount: 0, team: "white", type: "bishop" },
    ]);

    piece = board.get(Position.fromCell("a1"))!;
    builder = new MovementBuilder(piece, false);
  });

  it("Should generate horizontal positions", () => {
    const expected = new Set<Cell>(["b1", "c1", "d1", "e1", "f1", "g1"]);

    const generator = builder.addHorizontal().build();
    const result = toSetCell(generator);

    assertEquals(result, expected);
  });

  it("Should configure maximum limit of positions", () => {
    const expected = new Set<Cell>(["b1", "c1", "d1"]);

    const generator = builder.addHorizontal({ take: 3 }).build();
    const result = toSetCell(generator);

    assertEquals(result, expected);
  });

  it("Should configure maximum limit of positions", () => {
    const expected = new Set<Cell>(["b1", "c1", "d1", "e1", "f1"]);

    const generator = builder
      .addHorizontal({ acceptance: testAcceptance(board, piece) })
      .build();

    const result = toSetCell(generator);

    assertEquals(result, expected);
  });
});

describe("Builder.addVertical", () => {
  let board: Board;
  let piece: Piece;
  let builder: MovementBuilder;

  beforeEach(() => {
    board = Board.restore([
      { cell: "a3", moveCount: 0, team: "black", type: "bishop" },
      { cell: "a7", moveCount: 0, team: "white", type: "bishop" },
    ]);

    piece = board.get(Position.fromCell("a3"))!;
    builder = new MovementBuilder(piece, false);
  });

  it("Should generate positions", () => {
    const expected = new Set<Cell>(["a4", "a5", "a6", "a7", "a2", "a1"]);

    const generator = builder.addVertical().build();
    const result = toSetCell(generator);

    assertEquals(result, expected);
  });

  it("Should configure maximum limit of positions", () => {
    const expected = new Set<Cell>(["a4", "a2"]);

    const generator = builder.addVertical({ take: 1 }).build();
    const result = toSetCell(generator);

    assertEquals(result, expected);
  });

  it("Should configure custom acceptance", () => {
    const expected = new Set<Cell>(["a4", "a5", "a6", "a2", "a1"]);

    const generator = builder
      .addVertical({ acceptance: testAcceptance(board, piece) })
      .build();

    const result = toSetCell(generator);
    assertEquals(result, expected);
  });

  it("Should configure direction: top", () => {
    const expected = new Set<Cell>(["a4", "a5", "a6", "a7"]);

    const generator = builder.addVertical({ direction: "top" }).build();
    const result = toSetCell(generator);

    assertEquals(result, expected);
  });

  it("Should configure direction: bottom", () => {
    const expected = new Set<Cell>(["a2", "a1"]);

    const generator = builder
      .addVertical({ direction: "bottom" })
      .build();

    const result = toSetCell(generator);

    assertEquals(result, expected);
  });
});

describe("Builder.addL", () => {
  let board: Board;
  let piece: Piece;
  let builder: MovementBuilder;

  beforeEach(() => {
    board = Board.restore([
      { cell: "h4", moveCount: 0, team: "black", type: "bishop" },
      { cell: "g6", moveCount: 0, team: "white", type: "bishop" },
      { cell: "f3", moveCount: 0, team: "black", type: "bishop" },
    ]);

    piece = board.get(Position.fromCell("h4"))!;
    builder = new MovementBuilder(piece, false);
  });

  it("Should generate positions", () => {
    const expected = new Set<Cell>(["f5", "g6", "g2"]);

    const generator = builder.addL().build();
    const result = toSetCell(generator);

    assertEquals(result, expected);
  });
});

describe("Builder.addDiagonal", () => {
  let board: Board;
  let piece: Piece;
  let builder: MovementBuilder;

  beforeEach(() => {
    board = Board.restore([
      { cell: "b2", moveCount: 0, team: "black", type: "bishop" },
      { cell: "f6", moveCount: 0, team: "white", type: "bishop" },
    ]);

    piece = board.get(Position.fromCell("b2"))!;
    builder = new MovementBuilder(piece, false);
  });

  it("Should generate positions", () => {
    const expected = new Set<Cell>(["a3", "c3", "d4", "e5", "f6", "a1", "c1"]);

    const generator = builder.addDiagonal().build();
    const result = toSetCell(generator);

    assertEquals(result, expected);
  });

  it("Should configure maximum limit of positions", () => {
    const expected = new Set<Cell>(["a3", "c3", "a1", "c1"]);

    const generator = builder.addDiagonal({ take: 1 }).build();
    const result = toSetCell(generator);

    assertEquals(new Set(result), new Set(expected));
  });

  it("Should configure custom acceptance", () => {
    const expected = new Set<Cell>(["a3", "c3", "d4", "e5", "a1", "c1"]);

    const generator = builder
      .addDiagonal({ acceptance: testAcceptance(board, piece) })
      .build();

    const result = toSetCell(generator);
    assertEquals(result, expected);
  });

  it("Should configure direction: top", () => {
    const expected = new Set<Cell>(["a3", "c3", "d4", "e5", "f6"]);

    const generator = builder.addDiagonal({ direction: "top" }).build();
    const result = toSetCell(generator);

    assertEquals(result, expected);
  });

  it("Should configure direction: bottom", () => {
    const expectedResult = new Set<Cell>(["a1", "c1"]);

    const generator = builder
      .addDiagonal({ direction: "bottom" })
      .build();

    const result = toSetCell(generator);

    assertEquals(result, expectedResult);
  });
});

describe("Builder.build", () => {
  let board: Board;
  let piece: Piece;
  let builder: MovementBuilder;

  beforeEach(() => {
    board = Board.restore([
      { cell: "a1", moveCount: 0, team: "black", type: "bishop" },
    ]);

    piece = board.get(Position.fromCell("a1"))!;
    builder = new MovementBuilder(piece, false);
  });

  it("Should compose multiple movements", () => {
    const expected = new Set<Cell>(["a2", "b1", "b2", "c3", "b3", "c2"]);

    const generator = builder
      .addDiagonal({ take: 2 })
      .addHorizontal({ take: 1 })
      .addVertical({ take: 1 })
      .addL()
      .build();

    const result = toSetCell(generator);
    assertEquals(result, expected);
  });
});
