import { assertEquals } from "https://deno.land/std@0.202.0/assert/mod.ts";
import { toDirection } from "../src/domain/direction.ts";

Deno.test("Should black team move bottom", () => {
  const result = toDirection("black");
  assertEquals(result, "bottom");
});

Deno.test("Should white team move top", () => {
  const result = toDirection("white");
  assertEquals(result, "top");
});
