// @ts-nocheck asd
import blackKnight from "./icons/black-knight.svg";
import blackRook from "./icons/black-rook.svg";
import blackBishop from "./icons/black-bishop.svg";
import blackPawn from "./icons/black-pawn.svg";
import blackQueen from "./icons/black-queen.svg";
import blackKing from "./icons/black-king.svg";

import whiteKnight from "./icons/white-knight.svg";
import whiteRook from "./icons/white-rook.svg";
import whiteBishop from "./icons/white-bishop.svg";
import whitePawn from "./icons/white-pawn.svg";
import whiteQueen from "./icons/white-queen.svg";
import whiteKing from "./icons/white-king.svg";

import { Cell } from "./src/domain/cell.ts";
import { PieceData } from "./src/domain/piece.ts";
import { ViewModel } from "./view_model.ts";
import { isPieceDataEqual } from "./src/domain/piece_helpers.ts";

const selector = "data-cell";

export function bindCell(vm: ViewModel): void {
  const elements = Array.from(document.querySelectorAll(`[${selector}]`));
  for (const element of elements) {
    const updater = new CellUpdater(element);
    updater.onClick((cell) => vm.select(cell));
    vm.highlight.subscribe((value) => updater.updateHighlight(value));
    vm.origin.subscribe((value) => updater.updateOrigin(value));
    vm.pieces.subscribe((value) => updater.updatePieces(value));
  }
}

class CellUpdater {
  #element: HTMLElement;
  #cell: Cell;
  #data: PieceData | null;

  constructor(element: HTMLElement) {
    this.#element = element;
    this.#cell = element.getAttribute(selector) as Cell;
    this.#data = null;
  }

  onClick(consumer: (cell: Cell) => void): void {
    this.#element.addEventListener("click", () => consumer(this.#cell));
  }

  updateHighlight(value: Set<Cell>): void {
    this.#element.classList.toggle("-highlight", value.has(this.#cell));
  }

  updateOrigin(value: Cell | null): void {
    this.#element.classList.toggle("-origin", this.#cell === value);
  }

  updatePieces(pieces: Map<Cell, PieceData>): void {
    const newPieceData = pieces.get(this.#cell) ?? null;
    if (newPieceData === null) {
      this.#data = null;
      this.#element.innerHTML = "";
      return;
    }

    if (this.isPieceDataDifferentThan(newPieceData)) {
      this.#element.innerHTML = "";
      const img = document.createElement("img");
      img.src = this.#toSvg(newPieceData);
      this.#element.appendChild(img);
      this.#data = newPieceData;
    }
  }

  isPieceDataDifferentThan(other: PieceData): boolean {
    return this.#data === null || !isPieceDataEqual(this.#data, other);
  }

  #toSvg(piece: PieceData): unknown {
    switch (piece.type) {
      case "rook":
        return piece.team === "white" ? whiteRook : blackRook;
      case "knight":
        return piece.team === "white" ? whiteKnight : blackKnight;
      case "pawn":
        return piece.team === "white" ? whitePawn : blackPawn;
      case "king":
        return piece.team === "white" ? whiteKing : blackKing;
      case "queen":
        return piece.team === "white" ? whiteQueen : blackQueen;
      case "bishop":
        return piece.team === "white" ? whiteBishop : blackBishop;
    }
  }
}
