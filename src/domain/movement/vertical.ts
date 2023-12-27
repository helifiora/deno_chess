import type { Position, PositionIncrement } from "../position.ts";
import type { Board } from "../board.ts";
import type { Piece } from "../piece.ts";
import type { Direction } from "../direction.ts";
import { Sequence, type SequenceOptions } from "./sequence.ts";
import { merge } from "../../generator.ts";

export type VerticalOptions = SequenceOptions & { direction?: Direction };

export class Vertical extends Sequence {
  static topIncrement: PositionIncrement = { y: -1 };
  static bottomIncrement: PositionIncrement = { y: 1 };

  #direction: Direction;

  constructor(
    board: Board,
    piece: Piece,
    verify: boolean,
    options: VerticalOptions,
  ) {
    super(board, piece, verify, options);
    this.#direction = options.direction ?? "both";
  }

  execute(): Generator<Position> {
    if (this.#direction === "both") {
      const topGenerator = this.sequence(Vertical.topIncrement);
      const bottomGenerator = this.sequence(Vertical.bottomIncrement);
      return merge(topGenerator, bottomGenerator);
    }

    if (this.#direction === "top") {
      return this.sequence(Vertical.topIncrement);
    }

    return this.sequence(Vertical.bottomIncrement);
  }
}
