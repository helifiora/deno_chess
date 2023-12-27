import type { Team } from "./team.ts";
import type { PieceData, PieceDataPositionless } from "./piece.ts";
import { Piece } from "./piece.ts";
import { Position } from "./position.ts";

export class Board {
  #data: Table;

  constructor(data: Table) {
    this.#data = data;
  }

  static empty(): Board {
    const line = Array(8).fill(null) as Line;
    const table = Array(8).fill(null).map(() => [...line]) as Table;
    return new Board(table);
  }

  static restore(pieceDataList: PieceData[]): Board {
    const board = Board.empty();
    for (const pieceData of pieceDataList) {
      const piece = Piece.fromData(board, pieceData);
      board.#place(piece, piece.position);
    }

    return board;
  }

  *pieces(team: Team | null = null): Generator<Piece> {
    for (const position of this.positions()) {
      const result = this.get(position);
      if (result === null) {
        continue;
      }

      if (team === null || team === result.team) {
        yield result;
      }
    }
  }

  *positions(): Generator<Position> {
    for (let y = Position.min; y <= Position.max; y++) {
      for (let x = Position.min; x <= Position.max; x++) {
        yield new Position(x, y);
      }
    }
  }

  get(position: Position): Piece | null {
    return this.#data[position.y][position.x];
  }

  getKing(team: Team): Piece | null {
    for (const piece of this.pieces(team)) {
      if (piece.type === "king") {
        return piece;
      }
    }

    return null;
  }

  isEmpty(position: Position): boolean {
    return this.#data[position.y][position.x] === null;
  }

  isOccupied(position: Position): boolean {
    return this.#data[position.y][position.x] !== null;
  }

  move(piece: Piece, target: Position): PieceDataPositionless | null {
    const oldData = this.#removePiece(target);
    this.#clear(piece.position);
    this.#place(piece, target);
    piece.position = target;
    return oldData;
  }

  clone(): Board {
    const board = Board.empty();
    for (const piece of this.pieces()) {
      const clonedPiece = piece.clone(board);
      board.#place(clonedPiece, clonedPiece.position);
    }

    return board;
  }

  toData(): PieceData[] {
    return Array.from(this.pieces(), (s) => s.toData());
  }

  #removePiece(position: Position): PieceDataPositionless | null {
    const piece = this.get(position) ?? null;
    let result: PieceDataPositionless | null = null;
    if (piece !== null) {
      result = {
        moveCount: piece.moveCount,
        team: piece.team,
        type: piece.type,
      };
    }

    this.#clear(position);
    return result;
  }

  #clear(position: Position): void {
    this.#data[position.y][position.x] = null;
  }

  #place(piece: Piece, position: Position): void {
    this.#data[position.y][position.x] = piece;
  }
}

type Item = Piece | null;
type Line = [Item, Item, Item, Item, Item, Item, Item, Item];
type Table = [Line, Line, Line, Line, Line, Line, Line, Line];
