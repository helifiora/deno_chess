import type { BaseCommand } from "@/ui/command/base.ts";
import type { AppState } from "@/ui/store.ts";
import type { Cell } from "@/domain/cell.ts";
import { selectPieceMoves } from "@/application/usecase/select_piece_moves.ts";
import { movePieceTo } from "@/application/usecase/move_piece_to.ts";
import { SameTeamFromOriginAndTargetError } from "@/application/usecase/errors.ts";

export class CellClickCommand implements BaseCommand {
  #cell: Cell;

  constructor(cell: Cell) {
    this.#cell = cell;
  }

  handle(state: AppState): AppState {
    if (state.origin === null) {
      return this.#select(state);
    }

    return this.#move(state, state.origin);
  }

  #select(state: AppState): AppState {
    const result = selectPieceMoves(state, { origin: this.#cell });
    if (result.isErr()) {
      return state;
    }

    const origin = this.#cell;
    const highlight = new Set(result.data);
    return { ...state, origin, highlight };
  }

  #move(state: AppState, origin: Cell): AppState {
    const result = movePieceTo(state, { origin, target: this.#cell });
    if (result.isOk()) {
      return { ...state, ...result.data, origin: null, highlight: new Set() };
    }

    if (result.error instanceof SameTeamFromOriginAndTargetError) {
      return this.#select(state);
    }

    return { ...state, highlight: new Set(), origin: null };
  }
}
