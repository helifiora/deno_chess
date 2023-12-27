import type { Cell } from "./cell.ts";
import { error, ok, type Result } from "../result.ts";

export type PositionResult = Result<Position, PositionInvalidError>;

export type PositionData = {
  x: number;
  y: number;
};

export type PositionIncrement = Partial<PositionData>;

export class Position {
  static min = 0;
  static max = 7;

  #x: number;
  #y: number;

  constructor(x: number, y: number) {
    if (!Position.isValid(x, y)) {
      throw new PositionInvalidError(x, y);
    }

    this.#x = x;
    this.#y = y;
  }

  static fromCell(cell: Cell): Position {
    const x = "abcdefgh".indexOf(cell[0]);
    const y = 8 - parseInt(cell[1]);
    return new Position(x, y);
  }

  static increment(
    position: Position,
    increment: PositionIncrement,
  ): PositionResult {
    const x = position.x + (increment.x ?? 0);
    const y = position.y + (increment.y ?? 0);
    if (!Position.isValid(x, y)) {
      return error(new PositionInvalidError(x, y));
    }

    return ok(new Position(x, y));
  }

  static inRange(value: number): boolean {
    return value >= Position.min && value <= Position.max;
  }

  static isValid(x: number, y: number): boolean {
    return Position.inRange(x) && Position.inRange(y);
  }

  static *sequence(
    origin: Position,
    increment: PositionIncrement,
  ): Generator<Position> {
    let iterator = origin;
    while (true) {
      const result = Position.increment(iterator, increment);
      if (!result.ok) {
        break;
      }

      iterator = result.data;
      yield iterator.clone();
    }
  }

  get x(): number {
    return this.#x;
  }

  get y(): number {
    return this.#y;
  }

  equals(other: Position): boolean {
    return this.#x === other.#x && this.#y === other.#y;
  }

  clone(): Position {
    return new Position(this.#x, this.#y);
  }

  toCell(): Cell {
    const xCell = "abcdefgh".charAt(this.#x);
    const yCell = 8 - this.#y;
    return `${xCell}${yCell}` as Cell;
  }
}

export class PositionInvalidError extends Error {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
}
