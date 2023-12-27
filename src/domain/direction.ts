import type { Team } from "./team.ts";

export type Direction =
  | "top"
  | "bottom"
  | "both";

export function toDirection(team: Team): Direction {
  return team === "black" ? "bottom" : "top";
}
