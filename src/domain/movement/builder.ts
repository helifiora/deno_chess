import type { SequenceOptions } from "./sequence.ts";
import { Diagonal, type DiagonalOptions } from "./diagonal.ts";
import { Vertical, type VerticalOptions } from "./vertical.ts";
import { L } from "./l.ts";
import { Movement } from "./movement.ts";
import { Horizontal } from "./horizontal.ts";
import { Board } from "../board.ts";
import { merge } from "../../generator.ts";
import { Piece } from "../piece.ts";
import { Position } from "../position.ts";

export class MovementBuilder {
  #piece: Piece;
  #verify: boolean;
  #data: Movement[] = [];

  constructor(piece: Piece, verify: boolean) {
    this.#piece = piece;
    this.#verify = verify;
  }

  addL(): MovementBuilder {
    this.#data.push(new L(this.#piece.board, this.#piece, this.#verify));
    return this;
  }

  addHorizontal(options: SequenceOptions = {}): MovementBuilder {
    this.#data.push(
      new Horizontal(this.#piece.board, this.#piece, this.#verify, options),
    );
    return this;
  }

  addDiagonal(options: DiagonalOptions = {}): MovementBuilder {
    this.#data.push(
      new Diagonal(this.#piece.board, this.#piece, this.#verify, options),
    );
    return this;
  }

  addVertical(options: VerticalOptions = {}): MovementBuilder {
    this.#data.push(
      new Vertical(this.#piece.board, this.#piece, this.#verify, options),
    );
    return this;
  }

  build(): Generator<Position> {
    const generators = this.#data.map((s) => s.execute());
    return merge(...generators);
  }
}
