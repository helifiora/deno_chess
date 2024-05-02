import {
  assert,
  assertEquals,
  assertFalse,
  assertInstanceOf,
  assertNotStrictEquals,
  assertThrows,
} from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  generateInvalidData,
  generateValidData,
  toSetCell,
} from "./helpers/helpers.ts";
import { Cell } from "@/domain/cell.ts";
import {
  Position,
  PositionData,
  PositionIncrement,
  PositionInvalidError,
} from "@/domain/position.ts";

describe("Position.clone", () => {
  it("Should clone", () => {
    const pos = new Position(0, 0);
    const pos2 = pos.clone();
    assertNotStrictEquals(pos, pos2);
    assertEquals(pos.x, pos2.x);
    assertEquals(pos.y, pos2.y);
  });
});

describe("Position.equals", () => {
  it("Should compare equal values", () => {
    const p1 = new Position(4, 4);
    const p2 = new Position(4, 4);
    assert(p1.equals(p2));
  });

  it("Should compare different values", () => {
    const p1 = new Position(5, 5);
    const p2 = new Position(1, 1);
    assertFalse(p1.equals(p2));
  });
});

describe("Position.constructor", () => {
  for (const { x, y } of generateValidData()) {
    it(`Should create using valid data: [${x}, ${y}]`, () => {
      const position = new Position(x, y);
      assertEquals(position.x, x);
      assertEquals(position.y, y);
    });
  }

  for (const { x, y } of generateInvalidData()) {
    it(`Should throw (PositionInvalidError) using invalid data: [${x}, ${y}]`, () => {
      assertThrows(() => new Position(x, y), PositionInvalidError);
    });
  }
});

describe("Position.isValid", () => {
  for (const { x, y } of generateValidData()) {
    it(`Should verify if entry is valid: [${x}, ${y}]`, () => {
      assert(Position.isValid(x, y));
    });
  }

  for (const { x, y } of generateInvalidData()) {
    it(`Should verify if entry is invalid: [${x}, ${y}]`, () => {
      assertFalse(Position.isValid(x, y));
    });
  }
});

describe("Position.inRange", () => {
  for (const item of [0, 1, 2, 3, 4, 5, 6, 7]) {
    it(`Should verify it is in range: ${item}`, () => {
      assert(Position.inRange(item));
    });
  }

  for (const item of [-1, 8]) {
    it(`Should verify it is not in range: ${item}`, () => {
      assertFalse(Position.inRange(item), `Entry: ${item}`);
    });
  }
});

describe("Position.increment", () => {
  const valid = [
    { cell: "a1", increments: [{ y: -1 }, { x: 1 }] },
    { cell: "a2", increments: [{ y: -1 }, { y: 1 }, { x: 1 }] },
    { cell: "h1", increments: [{ y: -1 }, { x: -1 }] },
    { cell: "h8", increments: [{ y: 1 }, { x: -1 }] },
    { cell: "c4", increments: [{ y: 1 }, { x: -1 }, { x: 1, y: 1 }] },
  ];

  const invalid: { cell: Cell; increments: PositionIncrement[] }[] = [
    { cell: "a1", increments: [{ y: 1 }, { x: -1 }, { x: -1, y: -1 }] },
    { cell: "a2", increments: [{ x: -1 }] },
    { cell: "h1", increments: [{ y: 1 }, { x: 1 }] },
    { cell: "h8", increments: [{ y: -1 }, { x: 1 }] },
  ];

  for (const { cell, increments } of valid) {
    it(`Should return incremented position: ${cell}`, () => {
      const position = Position.fromCell(cell as Cell);
      for (const item of increments) {
        const newX = position.x + (item.x ?? 0);
        const newY = position.y + (item.y ?? 0);
        const result = Position.increment(position, item);
        assert(result.isOk());
        assertEquals(result.data.x, newX);
        assertEquals(result.data.y, newY);
      }
    });
  }

  for (const { cell, increments } of invalid) {
    it(`Should return (PositionInvalidError): ${cell}`, () => {
      const position = Position.fromCell(cell);
      for (const item of increments) {
        const result = Position.increment(position, item);
        assert(result.isErr());
        assertInstanceOf(result.error, PositionInvalidError);
      }
    });
  }
});

describe("Position.toCell", () => {
  const entries: { cell: Cell; position: PositionData }[] = [
    { cell: "a1", position: { x: 0, y: 7 } },
    { cell: "h1", position: { x: 7, y: 7 } },
    { cell: "d1", position: { x: 3, y: 7 } },
    { cell: "b3", position: { x: 1, y: 5 } },
    { cell: "c8", position: { x: 2, y: 0 } },
    { cell: "e4", position: { x: 4, y: 4 } },
    { cell: "g6", position: { x: 6, y: 2 } },
    { cell: "f5", position: { x: 5, y: 3 } },
  ];

  for (const { cell: expectedResult, position } of entries) {
    it(`Should transform to cell: [${position.x}, ${position.y}]`, () => {
      const result = new Position(position.x, position.y).toCell();
      assertEquals(result, expectedResult);
    });
  }
});

describe("Position.fromCell", () => {
  const entries = [
    { cell: "a1", position: { x: 0, y: 7 } },
    { cell: "h1", position: { x: 7, y: 7 } },
    { cell: "d1", position: { x: 3, y: 7 } },
    { cell: "b3", position: { x: 1, y: 5 } },
    { cell: "c8", position: { x: 2, y: 0 } },
    { cell: "e4", position: { x: 4, y: 4 } },
    { cell: "g6", position: { x: 6, y: 2 } },
    { cell: "f5", position: { x: 5, y: 3 } },
  ];

  for (const { cell, position: expectedResult } of entries) {
    it(`Should generate position: ${cell}`, () => {
      const result = Position.fromCell(cell as Cell);
      assertEquals(result.x, expectedResult.x);
      assertEquals(result.y, expectedResult.y);
    });
  }
});
