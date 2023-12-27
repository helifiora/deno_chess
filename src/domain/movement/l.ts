import type { Board } from "../board.ts";
import type { Movement } from "./movement.ts";
import type { Piece } from "../piece.ts";
import { Position, type PositionIncrement } from "../position.ts";
import { filter } from "../../generator.ts";
import { doesMoveCausesCheck } from "../check.ts";

export class L implements Movement {
  static increments: PositionIncrement[] = [
    { x: -1, y: -2 },
    { x: -1, y: 2 },
    { x: 1, y: -2 },
    { x: 1, y: 2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: 2, y: -1 },
    { x: 2, y: 1 },
  ];

  #board: Board;
  #piece: Piece;
  #verify: boolean;

  constructor(board: Board, piece: Piece, verify: boolean) {
    this.#board = board;
    this.#piece = piece;
    this.#verify = verify;
  }

  execute(): Generator<Position> {
    let result = this.#generatePositions();
    result = filter(result, (p) => this.#canMove(p));

    if (this.#verify) {
      result = filter(result, (p) => this.#moveDoesNotCauseCheck(p));
    }

    return result;
  }

  #canMove(target: Position): boolean {
    const targetPiece = this.#board.get(target);
    return targetPiece === null || !targetPiece.hasSameTeam(this.#piece);
  }

  *#generatePositions(): Generator<Position> {
    const origin = this.#piece.position;
    for (const increment of L.increments) {
      const result = Position.increment(origin, increment);
      if (result.ok) {
        yield result.data;
      }
    }
  }

  #moveDoesNotCauseCheck(target: Position): boolean {
    const result = doesMoveCausesCheck(
      this.#board,
      this.#piece.position,
      target,
    );

    return result.ok && result.data === false;
  }
}
