import type { Board } from "@/domain/board.ts";
import type { Cell } from "@/domain/cell.ts";
import type { Position } from "@/domain/position.ts";
import { flatMap, some } from "@/generator.ts";
import { invertTeam, type Team } from "@/domain/team.ts";

export type PieceType =
  | "rook"
  | "knight"
  | "pawn"
  | "king"
  | "queen"
  | "bishop";

export type PieceDataPositionless = {
  type: PieceType;
  team: Team;
  moveCount: number;
};

export type PieceData = PieceDataPositionless & { cell: Cell };

export abstract class Piece {
  #board: Board;
  #team: Team;
  #position: Position;
  #moveCount: number;

  constructor(
    board: Board,
    team: Team,
    position: Position,
    moveCount: number,
  ) {
    this.#board = board;
    this.#team = team;
    this.#position = position;
    this.#moveCount = moveCount;
  }

  abstract get type(): PieceType;

  abstract clone(board: Board): Piece;

  abstract moves(verifyCheck?: boolean): Generator<Position>;

  get board(): Board {
    return this.#board;
  }

  get team(): Team {
    return this.#team;
  }

  set position(value: Position) {
    this.#position = value;
  }

  get position(): Position {
    return this.#position;
  }

  get moveCount(): number {
    return this.#moveCount;
  }

  canMoveTo(target: Position): boolean {
    return some(this.moves(true), (s) => s.equals(target));
  }

  isInEnemyMove(): boolean {
    const enemyPieces = this.#board.pieces(invertTeam(this.#team));
    const enemyMoves = flatMap(enemyPieces, (s) => s.moves(false));
    return some(enemyMoves, (s) => s.equals(this.#position));
  }

  hasSameTeam(other: Piece): boolean {
    return this.#team === other.#team;
  }

  hasDifferentTeam(other: Piece): boolean {
    return this.#team !== other.team;
  }

  increaseCount(): void {
    this.#moveCount++;
  }

  toData(): PieceData {
    return {
      cell: this.position.toCell(),
      moveCount: this.moveCount,
      team: this.team,
      type: this.type,
    };
  }
}
