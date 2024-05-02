import type { Board } from "../board.ts";
import type { Piece } from "@/domain/piece/piece.ts";
import type { Position, PositionIncrement } from "@/domain/position.ts";
import type { Direction } from "@/domain/direction.ts";
import { Sequence, type SequenceOptions } from "@/domain/movement/sequence.ts";
import { merge } from "@/generator.ts";

export type DiagonalOptions = SequenceOptions & { direction?: Direction };

export class Diagonal extends Sequence {
  static topLeftIncrement: PositionIncrement = { x: -1, y: -1 };
  static topRightIncrement: PositionIncrement = { x: 1, y: -1 };
  static bottomLeftIncrement: PositionIncrement = { x: -1, y: 1 };
  static bottomRightIncrement: PositionIncrement = { x: 1, y: 1 };

  #direction: Direction;

  constructor(
    board: Board,
    piece: Piece,
    verify: boolean,
    options: DiagonalOptions,
  ) {
    super(board, piece, verify, options);
    this.#direction = options.direction ?? "both";
  }

  execute(): Generator<Position> {
    if (this.#direction === "both") {
      return merge(this.#topGenerator(), this.#bottomGenerator());
    }

    if (this.#direction === "top") {
      return this.#topGenerator();
    }

    return this.#bottomGenerator();
  }

  #topGenerator(): Generator<Position> {
    const topLeftGenerator = this.sequence(Diagonal.topLeftIncrement);
    const topRightGenerator = this.sequence(Diagonal.topRightIncrement);
    return merge(topLeftGenerator, topRightGenerator);
  }

  #bottomGenerator(): Generator<Position> {
    const bottomLeftGenerator = this.sequence(Diagonal.bottomLeftIncrement);
    const bottomRightGenerator = this.sequence(Diagonal.bottomRightIncrement);
    return merge(bottomLeftGenerator, bottomRightGenerator);
  }
}
