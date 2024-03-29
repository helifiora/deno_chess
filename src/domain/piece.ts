import { Position } from "./position.ts";
import type { Board } from "./board.ts";
import type { Cell } from "./cell.ts";
import { invertTeam, type Team } from "./team.ts";
import { flatMap, some } from "../generator.ts";
import { Move } from "./move/move.ts";
import { createMoves } from "./move/factory.ts";

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

export class Piece {
  #board: Board;
  #team: Team;
  #position: Position;
  #moveCount: number;
  #type: PieceType;
  #moves: Move;

  constructor(board: Board, type: PieceType, team: Team, position: Position, moveCount: number) {
    this.#board = board;
    this.#team = team;
    this.#position = position;
    this.#moveCount = moveCount;
    this.#type = type;
    this.#moves = createMoves(this);
  }

  static fromData(board: Board, data: PieceData): Piece {
    const { type, team, moveCount, cell } = data;
    const position = Position.fromCell(cell);
    return new Piece(board, type, team, position, moveCount);
  }

  get board(): Board {
    return this.#board;
  }

  get team(): Team {
    return this.#team;
  }

  get type(): PieceType {
    return this.#type;
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

  moves(verifyCheck = true): Generator<Position> {
    return this.#moves.execute(verifyCheck);
  }

  isInEnemyMove(): boolean {
    const enemyPieces = this.#board.pieces(invertTeam(this.#team));
    const enemyMoves = flatMap(enemyPieces, (s) => s.moves(false));
    return some(enemyMoves, (s) => s.equals(this.#position));
  }

  hasSameTeam(other: Piece): boolean {
    return this.#team === other.#team;
  }

  increaseCount(): void {
    this.#moveCount++;
  }

  toData(): PieceData {
    return {
      cell: this.#position.toCell(),
      moveCount: this.#moveCount,
      team: this.#team,
      type: this.#type,
    };
  }

  clone(board: Board): Piece {
    return new Piece(
      board,
      this.#type,
      this.#team,
      this.#position,
      this.#moveCount,
    );
  }
}
