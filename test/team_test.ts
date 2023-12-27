import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { invertTeam } from "../src/domain/team.ts";

Deno.test("Should invert team black to team white", () => {
  const result = invertTeam("black");
  assertEquals(result, "white");
});

Deno.test("Should invert team white to team black", () => {
  const result = invertTeam("white");
  assertEquals(result, "black");
});
