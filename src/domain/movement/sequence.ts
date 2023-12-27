import type { AcceptanceFn } from "./acceptance.ts";
import type { Piece } from "../piece.ts";
import { Position, type PositionIncrement } from "../position.ts";
import { Movement } from "./movement.ts";
import { Board } from "../board.ts";
import { filter, take } from "../../generator.ts";
import { doesMoveCausesCheck } from "../check.ts";

export type SequenceOptions = {
  take?: number;
  acceptance?: AcceptanceFn;
};

export abstract class Sequence implements Movement {
  #take: number | null;
  #acceptance: AcceptanceFn;
  #verify: boolean;

  board: Board;
  piece: Piece;

  constructor(
    board: Board,
    piece: Piece,
    verify: boolean,
    options: SequenceOptions,
  ) {
    this.board = board;
    this.piece = piece;
    this.#take = options.take ?? null;
    this.#verify = verify;
    this.#acceptance = options.acceptance ?? defaultAcceptance(board, piece);
  }

  abstract execute(): Generator<Position>;

  sequence(increment: PositionIncrement): Generator<Position> {
    let result = Position.sequence(this.piece.position, increment);
    if (this.#take !== null) {
      result = take(result, this.#take);
    }

    result = this.#takeByAcceptance(result);

    if (this.#verify) {
      result = filter(result, (s) => this.#moveDoesNotCauseCheck(s));
    }

    return result;
  }

  *#takeByAcceptance(data: Generator<Position>): Generator<Position> {
    for (const item of data) {
      const result = this.#acceptance(item);
      if (result === "last") {
        yield item;
        break;
      }

      if (result === "stop") {
        break;
      }

      yield item;
    }
  }

  #moveDoesNotCauseCheck(target: Position): boolean {
    const result = doesMoveCausesCheck(this.board, this.piece.position, target);
    return result.ok && result.data === false;
  }
}

function defaultAcceptance(board: Board, piece: Piece): AcceptanceFn {
  return (target) => {
    const targetPiece = board.get(target);
    if (targetPiece === null) {
      return "next";
    }

    if (targetPiece.hasSameTeam(piece)) {
      return "stop";
    }

    return "last";
  };
}
