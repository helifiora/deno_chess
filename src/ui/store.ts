import type { GameData } from "@/game.ts";
import type { Cell } from "@/domain/cell.ts";
import type { Team } from "@/domain/team.ts";
import { useReducer } from "react";
import { BaseCommand } from "@/ui/command/base.ts";
import { PieceData } from "@/domain/piece/piece.ts";
import { CellClickCommand } from "@/ui/command/cell_click_command.ts";

export type AppState = GameData & {
  origin: Cell | null;
  highlight: Set<Cell>;
  isCheck: Team | null;
  isCheckmate: boolean;
};

export interface AppStore {
  state: AppState;
  click(cell: Cell): void;
  getCellContent(cell: Cell): PieceData | null;
  hasOrigin(): boolean;
  isOrigin(cell: Cell): boolean;
  isHighlight(cell: Cell): boolean;
}

export function createStore(initial: AppState): AppStore {
  const [state, dispatch] = useReducer(reducer, initial);

  const click = (cell: Cell): void => {
    dispatch(new CellClickCommand(cell));
  };

  const getCellContent = (cell: Cell) =>
    state.pieces.filter((s: PieceData) => s.cell === cell).at(0) ?? null;

  const hasOrigin = () => state.origin !== null;

  const isOrigin = (cell: Cell) => state.origin === cell;

  const isHighlight = (cell: Cell) => state.highlight.has(cell);

  return {
    state,
    isOrigin,
    hasOrigin,
    isHighlight,
    getCellContent,
    click,
  };
}

function reducer(store: AppState, command: BaseCommand): AppState {
  return command.handle(store);
}
