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

export function bindCell(dom: Document, vm: ViewModel) {
  dom.querySelectorAll("[data-cell]").forEach(($el) => {
    let oldPieceData: PieceData | null = null;
    const cell = $el.getAttribute("data-cell") as Cell;

    $el.addEventListener("click", () => vm.select(cell));

    vm.highlight.subscribe((value) => {
      $el.classList.toggle("-highlight", value.has(cell));
    });

    vm.origin.subscribe((value) => {
      $el.classList.toggle("-origin", value === cell);
    });

    vm.pieces.subscribe((value) => {
      const data = value.get(cell) ?? null;
      if (data === null) {
        $el.innerHTML = "";
      } else if (!pieceDataIsEqual(oldPieceData, data)) {
        $el.innerHTML = "";
        const img = dom.createElement("img");
        img.src = pieceToSvg(data);
        $el.appendChild(img);
        oldPieceData = data;
      }
    });
  });
}

function pieceToSvg(piece: PieceData): string {
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

function pieceDataIsEqual(v1: PieceData | null, v2: PieceData | null): boolean {
  if (v1 === null && v2 === null) {
    return false;
  }

  return JSON.stringify(v1) === JSON.stringify(v2);
}
