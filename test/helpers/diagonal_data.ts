import { Cell } from "../../src/domain/cell.ts";

type Data = () => [input: Cell, result: Cell[]][];

export const diagonalData: Data = () => [
  ["a1", ["b2", "c3", "d4", "e5", "f6", "g7", "h8"]],
  ["a2", ["b3", "c4", "d5", "e6", "f7", "g8", "b1"]],
  ["a3", ["b4", "c5", "d6", "e7", "f8", "b2", "c1"]],
  ["a4", ["b5", "c6", "d7", "e8", "b3", "c2", "d1"]],
  ["a5", ["b6", "c7", "d8", "b4", "c3", "d2", "e1"]],
  ["a6", ["b7", "c8", "b5", "c4", "d3", "e2", "f1"]],
  ["a7", ["b8", "b6", "c5", "d4", "e3", "f2", "g1"]],
  ["a8", ["b7", "c6", "d5", "e4", "f3", "g2", "h1"]],
  ["b1", ["a2", "c2", "d3", "e4", "f5", "g6", "h7"]],
  ["b2", ["a3", "c3", "d4", "e5", "f6", "g7", "h8", "a1", "c1"]],
  ["b3", ["a4", "c4", "d5", "e6", "f7", "g8", "a2", "c2", "d1"]],
  ["b4", ["a5", "c5", "d6", "e7", "f8", "a3", "c3", "d2", "e1"]],
  ["b5", ["a6", "c6", "d7", "e8", "a4", "c4", "d3", "e2", "f1"]],
  ["b6", ["a7", "c7", "d8", "a5", "c5", "d4", "e3", "f2", "g1"]],
  ["b7", ["a8", "c8", "a6", "c6", "d5", "e4", "f3", "g2", "h1"]],
  ["b8", ["a7", "c7", "d6", "e5", "f4", "g3", "h2"]],
  ["c1", ["b2", "a3", "d2", "e3", "f4", "g5", "h6"]],
  ["c2", ["b3", "a4", "d3", "e4", "f5", "g6", "h7", "b1", "d1"]],
  ["c3", ["b4", "a5", "d4", "e5", "f6", "g7", "h8", "b2", "a1", "d2", "e1"]],
  ["c4", ["b5", "a6", "d5", "e6", "f7", "g8", "b3", "a2", "d3", "e2", "f1"]],
  ["c5", ["b6", "a7", "d6", "e7", "f8", "b4", "a3", "d4", "e3", "f2", "g1"]],
  ["c6", ["b7", "a8", "d7", "e8", "b5", "a4", "d5", "e4", "f3", "g2", "h1"]],
  ["c7", ["b8", "d8", "b6", "a5", "d6", "e5", "f4", "g3", "h2"]],
  ["c8", ["b7", "a6", "d7", "e6", "f5", "g4", "h3"]],
  ["d1", ["c2", "b3", "a4", "e2", "f3", "g4", "h5"]],
  ["d2", ["c3", "b4", "a5", "e3", "f4", "g5", "h6", "c1", "e1"]],
  ["d3", ["c4", "b5", "a6", "e4", "f5", "g6", "h7", "c2", "b1", "e2", "f1"]],
  ["d4", [
    "c5",
    "b6",
    "a7",
    "e5",
    "f6",
    "g7",
    "h8",
    "c3",
    "b2",
    "a1",
    "e3",
    "f2",
    "g1",
  ]],
  ["d5", [
    "c6",
    "b7",
    "a8",
    "e6",
    "f7",
    "g8",
    "c4",
    "b3",
    "a2",
    "e4",
    "f3",
    "g2",
    "h1",
  ]],
  ["d6", ["c7", "b8", "e7", "f8", "c5", "b4", "a3", "e5", "f4", "g3", "h2"]],
  ["d7", ["c8", "e8", "c6", "b5", "a4", "e6", "f5", "g4", "h3"]],
  ["d8", ["c7", "b6", "a5", "e7", "f6", "g5", "h4"]],
  ["e1", ["d2", "c3", "b4", "a5", "f2", "g3", "h4"]],
  ["e2", ["d3", "c4", "b5", "a6", "f3", "g4", "h5", "d1", "f1"]],
  ["e3", ["d4", "c5", "b6", "a7", "f4", "g5", "h6", "d2", "c1", "f2", "g1"]],
  ["e4", [
    "d5",
    "c6",
    "b7",
    "a8",
    "f5",
    "g6",
    "h7",
    "d3",
    "c2",
    "b1",
    "f3",
    "g2",
    "h1",
  ]],
  ["e5", [
    "d6",
    "c7",
    "b8",
    "f6",
    "g7",
    "h8",
    "d4",
    "c3",
    "b2",
    "a1",
    "f4",
    "g3",
    "h2",
  ]],
  ["e6", ["d7", "c8", "f7", "g8", "d5", "c4", "b3", "a2", "f5", "g4", "h3"]],
  ["e7", ["d8", "f8", "d6", "c5", "b4", "a3", "f6", "g5", "h4"]],
  ["e8", ["d7", "c6", "b5", "a4", "f7", "g6", "h5"]],
  ["f1", ["e2", "d3", "c4", "b5", "a6", "g2", "h3"]],
  ["f2", ["e3", "d4", "c5", "b6", "a7", "g3", "h4", "e1", "g1"]],
  ["f3", ["e4", "d5", "c6", "b7", "a8", "g4", "h5", "e2", "d1", "g2", "h1"]],
  ["f4", ["e5", "d6", "c7", "b8", "g5", "h6", "e3", "d2", "c1", "g3", "h2"]],
  ["f5", ["e6", "d7", "c8", "g6", "h7", "e4", "d3", "c2", "b1", "g4", "h3"]],
  ["f6", ["e7", "d8", "g7", "h8", "e5", "d4", "c3", "b2", "a1", "g5", "h4"]],
  ["f7", ["e8", "g8", "e6", "d5", "c4", "b3", "a2", "g6", "h5"]],
  ["f8", ["e7", "d6", "c5", "b4", "a3", "g7", "h6"]],
  ["g1", ["f2", "e3", "d4", "c5", "b6", "a7", "h2"]],
  ["g2", ["f3", "e4", "d5", "c6", "b7", "a8", "h3", "f1", "h1"]],
  ["g3", ["f4", "e5", "d6", "c7", "b8", "h4", "f2", "e1", "h2"]],
  ["g4", ["f5", "e6", "d7", "c8", "h5", "f3", "e2", "d1", "h3"]],
  ["g5", ["f6", "e7", "d8", "h6", "f4", "e3", "d2", "c1", "h4"]],
  ["g6", ["f7", "e8", "h7", "f5", "e4", "d3", "c2", "b1", "h5"]],
  ["g7", ["f8", "h8", "f6", "e5", "d4", "c3", "b2", "a1", "h6"]],
  ["g8", ["f7", "e6", "d5", "c4", "b3", "a2", "h7"]],
  ["h1", ["g2", "f3", "e4", "d5", "c6", "b7", "a8"]],
  ["h2", ["g3", "f4", "e5", "d6", "c7", "b8", "g1"]],
  ["h3", ["g4", "f5", "e6", "d7", "c8", "g2", "f1"]],
  ["h4", ["g5", "f6", "e7", "d8", "g3", "f2", "e1"]],
  ["h5", ["g6", "f7", "e8", "g4", "f3", "e2", "d1"]],
  ["h6", ["g7", "f8", "g5", "f4", "e3", "d2", "c1"]],
  ["h7", ["g8", "g6", "f5", "e4", "d3", "c2", "b1"]],
  ["h8", ["g7", "f6", "e5", "d4", "c3", "b2", "a1"]],
];
