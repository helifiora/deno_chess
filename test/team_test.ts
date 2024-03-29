import { assertEquals } from "@std/assert";
import { invertTeam } from "@/domain/team.ts";

Deno.test("Should invert team black to team white", () => {
  const result = invertTeam("black");
  assertEquals(result, "white");
});

Deno.test("Should invert team white to team black", () => {
  const result = invertTeam("white");
  assertEquals(result, "black");
});
