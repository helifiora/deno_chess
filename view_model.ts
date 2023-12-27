import { Signal } from "./signal.ts";
import { createGame } from "./src/application/usecase/create_game.ts";
import {
  SameTeamFromOriginAndTargetError,
} from "./src/application/usecase/errors.ts";
import { movePieceTo } from "./src/application/usecase/move_piece_to.ts";
import { selectPieceMoves } from "./src/application/usecase/select_piece_moves.ts";
import { Cell } from "./src/domain/cell.ts";
import { PieceData, PieceDataPositionless } from "./src/domain/piece.ts";
import { Team } from "./src/domain/team.ts";
import { GameData } from "./src/game.ts";

type ViewModelInitial = {
  game?: GameData;
  highlight?: Cell[];
  origin?: Cell;
};

export class ViewModel {
  #data: GameData;

  capturedBlack: Signal<number>;
  capturedWhite: Signal<number>;
  captured: Signal<PieceDataPositionless[]>;
  highlight: Signal<Set<Cell>>;
  origin: Signal<Cell | null>;
  pieces: Signal<Map<Cell, PieceData>>;
  round: Signal<number>;
  turn: Signal<Team>;
  check: Signal<string>;

  constructor(initial: ViewModelInitial = {}) {
    this.#data = initial.game ?? createGame().data;
    this.turn = new Signal(this.#data.turn);
    this.round = new Signal(this.#data.round);
    // new Set(this.#data.pieces)
    this.pieces = new Signal(
      new Map(this.#data.pieces.map((s) => [s.cell, s])),
    );
    this.captured = new Signal(this.#data.capturedPieces);
    this.check = new Signal<string>("");
    this.origin = new Signal(initial.origin ?? null);
    this.highlight = new Signal(new Set(initial.highlight ?? []));
    const grouped = Object.groupBy(this.#data.capturedPieces, (s) => s.team);
    this.capturedBlack = new Signal(grouped.black?.length ?? 0);
    this.capturedWhite = new Signal(grouped.white?.length ?? 0);
  }

  select(cell: Cell): void {
    if (this.origin.value !== null) {
      this.#movePiece(this.origin.value, cell);
    } else {
      this.#selectPiece(cell);
    }
  }

  notifyAll(): void {
    this.captured.notify();
    this.pieces.notify();
    this.capturedBlack.notify();
    this.capturedWhite.notify();
    this.turn.notify();
    this.round.notify();
    this.check.notify();
    this.origin.notify();
    this.highlight.notify();
  }

  #movePiece(origin: Cell, target: Cell): void {
    this.#updateOrigin(null);
    const result = movePieceTo(this.#data, { origin, target });
    if (!result.ok) {
      if (result.error instanceof SameTeamFromOriginAndTargetError) {
        this.#selectPiece(target);
      }
      return;
    }

    if (result.data.isCheck === null) {
      this.check.value = "";
    } else {
      let team = `${result.data.isCheck}`;
      if (result.data.isCheckmate) {
        team += " - CHECKMATE";
      }

      this.check.value = team;
    }

    this.#updateGameData(result.data);
  }

  #selectPiece(origin: Cell): void {
    const result = selectPieceMoves(this.#data, { origin });
    if (result.ok) {
      this.#updateOrigin({ origin, cells: result.data });
    }
  }

  #updateOrigin(result: { origin: Cell; cells: Cell[] } | null): void {
    if (result) {
      this.origin.value = result.origin;
      this.highlight.value = new Set(result.cells);
    } else {
      this.origin.value = null;
      this.highlight.value = new Set();
    }
  }

  #updateGameData(newGameData: GameData): void {
    this.#data = newGameData;
    this.pieces.value = new Map(this.#data.pieces.map((s) => [s.cell, s]));
    this.turn.value = this.#data.turn;
    this.round.value = this.#data.round;
    this.#updateCaptured(this.#data.capturedPieces);
  }

  #updateCaptured(value: PieceDataPositionless[]): void {
    const grouped = Object.groupBy(value, (s) => s.team);
    this.capturedBlack.value = grouped.black?.length ?? 0;
    this.capturedWhite.value = grouped.white?.length ?? 0;
  }
}
