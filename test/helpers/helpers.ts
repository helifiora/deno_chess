import type { PieceData } from "@/domain/piece/piece.ts";
import {
  Position,
  type PositionData,
  PositionIncrement,
} from "@/domain/position.ts";
import { Cell } from "@/domain/cell.ts";
import { map } from "@/generator.ts";

export function fakePieceData(
  override: Partial<PieceData> & { cell: Cell },
): PieceData {
  return {
    cell: override.cell,
    moveCount: override.moveCount ?? 0,
    team: override.team ?? "black",
    type: override.type ?? "rook",
  };
}

export function toSetCell(iterable: Iterable<Position>): Set<Cell> {
  return new Set(map(iterable, (s) => s.toCell()));
}

export function* generateValidData(): Generator<PositionData> {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      yield { x, y };
    }
  }
}

export function* generateInvalidData(): Generator<PositionData> {
  for (const i of [-1, 8]) {
    for (let j = 0; j < 8; j++) {
      yield { x: i, y: j };
      yield { x: j, y: i };
    }
  }
}

export function generateValidPosition(): Generator<Position> {
  return map(generateValidData(), (s) => new Position(s.x, s.y));
}

export function generateValidCell(): Generator<Cell> {
  return map(generateValidPosition(), (s) => s.toCell());
}

export function* createSequence(
  origin: Position,
  increment: PositionIncrement,
): Generator<Position> {
  let iterator = origin;
  while (true) {
    const result = Position.increment(iterator, increment);
    if (result.isErr()) {
      break;
    }

    iterator = result.data;
    yield iterator.clone();
  }
}
