export type Team =
  | "black"
  | "white";

export function invertTeam(team: Team): Team {
  return team === "black" ? "white" : "black";
}
