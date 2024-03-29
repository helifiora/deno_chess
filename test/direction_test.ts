import { assertEquals } from "@std/assert";
import { toDirection } from "@/domain/direction.ts";

Deno.test("Should black team move bottom", () => {
  const result = toDirection("black");
  assertEquals(result, "bottom");
});

Deno.test("Should white team move top", () => {
  const result = toDirection("white");
  assertEquals(result, "top");
});
