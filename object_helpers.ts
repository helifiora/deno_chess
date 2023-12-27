import isEqual from "https://deno.land/x/lodash_es@v0.0.2/src/isEqual.js";

export function isSame(v1: unknown, v2: unknown): boolean {
  return isEqual(v1, v2);
}
