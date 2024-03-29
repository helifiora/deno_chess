import { assert, assertEquals, assertFalse } from "@std/assert";

import { every, filter, flatMap, map, merge, some, take, toArray, toSet } from "@/generator.ts";

Deno.test("Should map", () => {
  const items = [1, 5, 9];
  const expectedResult = [2, 10, 18];
  const result = Array.from(map(items, (s) => s * 2));
  assertEquals(result, expectedResult);
});

Deno.test("Should filter", () => {
  const items = [10, 13, 15, 18, 24, 26, 30];
  const expectedResult = [18, 24, 26, 30];
  const result = Array.from(filter(items, (s) => s >= 18));
  assertEquals(result, expectedResult);
});

Deno.test("Should take", () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const expectedResult = [1, 2, 3, 4, 5];
  const result = Array.from(take(items, 5));
  assertEquals(result, expectedResult);
});

Deno.test("Should map and flatten", () => {
  const items = [
    { id: 1, values: [1, 2, 3] },
    { id: 2, values: [4, 5, 6] },
    { id: 3, values: [7] },
  ];

  const expectedResult = [1, 2, 3, 4, 5, 6, 7];
  const result = Array.from(flatMap(items, (s) => s.values));
  assertEquals(result, expectedResult);
});

Deno.test("Should merge", () => {
  function* gen(start: number, quantity: number) {
    let value = start;
    let count = 1;
    while (count <= quantity) {
      yield value;
      value++;
      count++;
    }
  }

  const item1 = gen(1, 3);
  const item2 = gen(4, 3);
  const expectedResult = [1, 2, 3, 4, 5, 6];
  const result = Array.from(merge(item1, item2));
  assertEquals(result, expectedResult);
});

Deno.test("Should some", () => {
  const items = [1, 5, 6, 10];
  assert(some(items, (s) => s >= 10));
  assertFalse(some(items, (s) => s >= 12));
});

Deno.test("Should every", () => {
  const items = [1, 5, 6, 10];
  assert(every(items, (s) => s <= 10));
  assertFalse(every(items, (s) => s < 10));
});

Deno.test("Should transform to array", () => {
  const expected = ["a1", "a3", "a5"];
  const entry = ["a1", "a2", "a3", "a4", "a5"];
  const result = toArray(filter(entry, (s) => Number(s[1]) % 2 !== 0));
  assertEquals(result, expected);
});

Deno.test("Should transform to set", () => {
  const expected = new Set(["a1", "a3", "a5"]);
  const entry = ["a1", "a3", "a5"];
  const result = toSet(entry);
  assertEquals(result, expected);
});
