import type { AcceptanceFn } from "./acceptance.ts";
import type { Piece } from "@/domain/piece/piece.ts";
import type { Board } from "@/domain/board.ts";
import type { Movement } from "./movement.ts";
import { Position, type PositionIncrement } from "../position.ts";
import { filter, take } from "@/generator.ts";
import { CheckService } from "@/domain/check.ts";

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
    this.#acceptance = options.acceptance ?? defaultAcceptance(piece);
  }

  abstract execute(): Generator<Position>;

  sequence(increment: PositionIncrement): Generator<Position> {
    let result = this.#generatePositions(increment);
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
      const result = this.#acceptance({
        piece: this.board.get(item),
        position: item,
      });

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
    return new CheckService(this.board)
      .isMoveCauseCheck(this.piece.position, target)
      .match((value) => value === false, false);
  }

  *#generatePositions(increment: PositionIncrement): Generator<Position> {
    let iterator = this.piece.position;
    while (true) {
      const result = Position.increment(iterator, increment);
      if (result.isErr()) {
        break;
      }

      iterator = result.data;
      yield iterator.clone();
    }
  }
}

function defaultAcceptance(piece: Piece): AcceptanceFn {
  return (target) => {
    if (target.piece === null) {
      return "next";
    }

    if (target.piece.hasSameTeam(piece)) {
      return "stop";
    }

    return "last";
  };
}
