import type { Cell } from "@/domain/cell.ts";
import type { Team } from "@/domain/team.ts";

export class NoPieceInCellError extends Error {
  cell: Cell;

  constructor(cell: Cell) {
    super();
    this.cell = cell;
  }
}

export class NoPieceTurnError extends Error {
  turn: Team;
  pieceTeam: Team;

  constructor(turn: Team, pieceTeam: Team) {
    super();
    this.turn = turn;
    this.pieceTeam = pieceTeam;
  }
}

export class NoDestinyInMovesError extends Error {
  cell: Cell;

  constructor(cell: Cell) {
    super();
    this.cell = cell;
  }
}

export class SameOriginAndDestinyError extends Error {
  cell: Cell;

  constructor(cell: Cell) {
    super();
    this.cell = cell;
  }
}

export class SameTeamFromOriginAndTargetError extends Error {
  team: Team;

  constructor(team: Team) {
    super();
    this.team = team;
  }
}
