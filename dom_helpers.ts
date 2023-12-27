/// <reference lib="dom" />

import { Cell } from "./src/domain/cell.ts";

export function parse(dom: Document, id: string): HTMLElement {
  const element = dom.getElementById(id);
  if (element === null) {
    throw new Error(`Element not found! ${id}`);
  }

  return element;
}

export function getCells(dom: Document): [Cell, HTMLElement][] {
  return [
    ["a1", parse(dom, "a1")],
    ["a2", parse(dom, "a2")],
    ["a3", parse(dom, "a3")],
    ["a4", parse(dom, "a4")],
    ["a5", parse(dom, "a5")],
    ["a6", parse(dom, "a6")],
    ["a7", parse(dom, "a7")],
    ["a8", parse(dom, "a8")],
    ["b1", parse(dom, "b1")],
    ["b2", parse(dom, "b2")],
    ["b3", parse(dom, "b3")],
    ["b4", parse(dom, "b4")],
    ["b5", parse(dom, "b5")],
    ["b6", parse(dom, "b6")],
    ["b7", parse(dom, "b7")],
    ["b8", parse(dom, "b8")],
    ["c1", parse(dom, "c1")],
    ["c2", parse(dom, "c2")],
    ["c3", parse(dom, "c3")],
    ["c4", parse(dom, "c4")],
    ["c5", parse(dom, "c5")],
    ["c6", parse(dom, "c6")],
    ["c7", parse(dom, "c7")],
    ["c8", parse(dom, "c8")],
    ["d1", parse(dom, "d1")],
    ["d2", parse(dom, "d2")],
    ["d3", parse(dom, "d3")],
    ["d4", parse(dom, "d4")],
    ["d5", parse(dom, "d5")],
    ["d6", parse(dom, "d6")],
    ["d7", parse(dom, "d7")],
    ["d8", parse(dom, "d8")],
    ["e1", parse(dom, "e1")],
    ["e2", parse(dom, "e2")],
    ["e3", parse(dom, "e3")],
    ["e4", parse(dom, "e4")],
    ["e5", parse(dom, "e5")],
    ["e6", parse(dom, "e6")],
    ["e7", parse(dom, "e7")],
    ["e8", parse(dom, "e8")],
    ["f1", parse(dom, "f1")],
    ["f2", parse(dom, "f2")],
    ["f3", parse(dom, "f3")],
    ["f4", parse(dom, "f4")],
    ["f5", parse(dom, "f5")],
    ["f6", parse(dom, "f6")],
    ["f7", parse(dom, "f7")],
    ["f8", parse(dom, "f8")],
    ["g1", parse(dom, "g1")],
    ["g2", parse(dom, "g2")],
    ["g3", parse(dom, "g3")],
    ["g4", parse(dom, "g4")],
    ["g5", parse(dom, "g5")],
    ["g6", parse(dom, "g6")],
    ["g7", parse(dom, "g7")],
    ["g8", parse(dom, "g8")],
    ["h1", parse(dom, "h1")],
    ["h2", parse(dom, "h2")],
    ["h3", parse(dom, "h3")],
    ["h4", parse(dom, "h4")],
    ["h5", parse(dom, "h5")],
    ["h6", parse(dom, "h6")],
    ["h7", parse(dom, "h7")],
    ["h8", parse(dom, "h8")],
  ];
}

export function getCellElements(dom: Document): Record<Cell, HTMLElement> {
  return Object.fromEntries(getCells(dom)) as Record<Cell, HTMLElement>;
}
