import { Cell } from "../../src/domain/cell.ts";

type Data = () => [input: Cell, result: Cell[]][];

export const verticalData: Data = () => [
  ["a1", ["a2", "a3", "a4", "a5", "a6", "a7", "a8"]],
  ["a2", ["a3", "a4", "a5", "a6", "a7", "a8", "a1"]],
  ["a3", ["a4", "a5", "a6", "a7", "a8", "a2", "a1"]],
  ["a4", ["a5", "a6", "a7", "a8", "a3", "a2", "a1"]],
  ["a5", ["a6", "a7", "a8", "a4", "a3", "a2", "a1"]],
  ["a6", ["a7", "a8", "a5", "a4", "a3", "a2", "a1"]],
  ["a7", ["a8", "a6", "a5", "a4", "a3", "a2", "a1"]],
  ["a8", ["a7", "a6", "a5", "a4", "a3", "a2", "a1"]],
  ["b1", ["b2", "b3", "b4", "b5", "b6", "b7", "b8"]],
  ["b2", ["b3", "b4", "b5", "b6", "b7", "b8", "b1"]],
  ["b3", ["b4", "b5", "b6", "b7", "b8", "b2", "b1"]],
  ["b4", ["b5", "b6", "b7", "b8", "b3", "b2", "b1"]],
  ["b5", ["b6", "b7", "b8", "b4", "b3", "b2", "b1"]],
  ["b6", ["b7", "b8", "b5", "b4", "b3", "b2", "b1"]],
  ["b7", ["b8", "b6", "b5", "b4", "b3", "b2", "b1"]],
  ["b8", ["b7", "b6", "b5", "b4", "b3", "b2", "b1"]],
  ["c1", ["c2", "c3", "c4", "c5", "c6", "c7", "c8"]],
  ["c2", ["c3", "c4", "c5", "c6", "c7", "c8", "c1"]],
  ["c3", ["c4", "c5", "c6", "c7", "c8", "c2", "c1"]],
  ["c4", ["c5", "c6", "c7", "c8", "c3", "c2", "c1"]],
  ["c5", ["c6", "c7", "c8", "c4", "c3", "c2", "c1"]],
  ["c6", ["c7", "c8", "c5", "c4", "c3", "c2", "c1"]],
  ["c7", ["c8", "c6", "c5", "c4", "c3", "c2", "c1"]],
  ["c8", ["c7", "c6", "c5", "c4", "c3", "c2", "c1"]],
  ["d1", ["d2", "d3", "d4", "d5", "d6", "d7", "d8"]],
  ["d2", ["d3", "d4", "d5", "d6", "d7", "d8", "d1"]],
  ["d3", ["d4", "d5", "d6", "d7", "d8", "d2", "d1"]],
  ["d4", ["d5", "d6", "d7", "d8", "d3", "d2", "d1"]],
  ["d5", ["d6", "d7", "d8", "d4", "d3", "d2", "d1"]],
  ["d6", ["d7", "d8", "d5", "d4", "d3", "d2", "d1"]],
  ["d7", ["d8", "d6", "d5", "d4", "d3", "d2", "d1"]],
  ["d8", ["d7", "d6", "d5", "d4", "d3", "d2", "d1"]],
  ["e1", ["e2", "e3", "e4", "e5", "e6", "e7", "e8"]],
  ["e2", ["e3", "e4", "e5", "e6", "e7", "e8", "e1"]],
  ["e3", ["e4", "e5", "e6", "e7", "e8", "e2", "e1"]],
  ["e4", ["e5", "e6", "e7", "e8", "e3", "e2", "e1"]],
  ["e5", ["e6", "e7", "e8", "e4", "e3", "e2", "e1"]],
  ["e6", ["e7", "e8", "e5", "e4", "e3", "e2", "e1"]],
  ["e7", ["e8", "e6", "e5", "e4", "e3", "e2", "e1"]],
  ["e8", ["e7", "e6", "e5", "e4", "e3", "e2", "e1"]],
  ["f1", ["f2", "f3", "f4", "f5", "f6", "f7", "f8"]],
  ["f2", ["f3", "f4", "f5", "f6", "f7", "f8", "f1"]],
  ["f3", ["f4", "f5", "f6", "f7", "f8", "f2", "f1"]],
  ["f4", ["f5", "f6", "f7", "f8", "f3", "f2", "f1"]],
  ["f5", ["f6", "f7", "f8", "f4", "f3", "f2", "f1"]],
  ["f6", ["f7", "f8", "f5", "f4", "f3", "f2", "f1"]],
  ["f7", ["f8", "f6", "f5", "f4", "f3", "f2", "f1"]],
  ["f8", ["f7", "f6", "f5", "f4", "f3", "f2", "f1"]],
  ["g1", ["g2", "g3", "g4", "g5", "g6", "g7", "g8"]],
  ["g2", ["g3", "g4", "g5", "g6", "g7", "g8", "g1"]],
  ["g3", ["g4", "g5", "g6", "g7", "g8", "g2", "g1"]],
  ["g4", ["g5", "g6", "g7", "g8", "g3", "g2", "g1"]],
  ["g5", ["g6", "g7", "g8", "g4", "g3", "g2", "g1"]],
  ["g6", ["g7", "g8", "g5", "g4", "g3", "g2", "g1"]],
  ["g7", ["g8", "g6", "g5", "g4", "g3", "g2", "g1"]],
  ["g8", ["g7", "g6", "g5", "g4", "g3", "g2", "g1"]],
  ["h1", ["h2", "h3", "h4", "h5", "h6", "h7", "h8"]],
  ["h2", ["h3", "h4", "h5", "h6", "h7", "h8", "h1"]],
  ["h3", ["h4", "h5", "h6", "h7", "h8", "h2", "h1"]],
  ["h4", ["h5", "h6", "h7", "h8", "h3", "h2", "h1"]],
  ["h5", ["h6", "h7", "h8", "h4", "h3", "h2", "h1"]],
  ["h6", ["h7", "h8", "h5", "h4", "h3", "h2", "h1"]],
  ["h7", ["h8", "h6", "h5", "h4", "h3", "h2", "h1"]],
  ["h8", ["h7", "h6", "h5", "h4", "h3", "h2", "h1"]],
];