import type { Position } from "./position.ts";
import type { Team } from "./team.ts";

export class NoKingFoundError extends Error {
  team: Team;

  constructor(team: Team) {
    super();
    this.team = team;
  }
}

export class NoPieceFoundError extends Error {
  position: Position;

  constructor(position: Position) {
    super();
    this.position = position;
  }
}
