/// @ts-nocheck asd
/// <reference lib="dom" />
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

import { getCellElements, parse } from "./dom_helpers.ts";
import { Cell } from "./src/domain/cell.ts";
import { PieceData } from "./src/domain/piece.ts";
import { ViewModel } from "./view_model.ts";
import { isSame } from "./object_helpers.ts";

const $cells = getCellElements(document);
const $round = parse(document, "current-round")!;
const $team = parse(document, "current-team")!;
const $capturedBlack = parse(document, "captured-black");
const $capturedWhite = parse(document, "captured-white");
const $messageCheck = parse(document, "message-check");

const vm = new ViewModel({});

// BIND CLICK EVENTS
for (const [key, value] of Object.entries($cells)) {
  value.addEventListener("click", () => vm.select(key as Cell));
}

vm.origin.subscribe((value, old) => {
  if (old) {
    $cells[old].classList.remove("selected-origin");
  }

  if (value) {
    $cells[value].classList.add("selected-origin");
  }
});

vm.highlight.subscribe((value, old) => {
  if (old) {
    for (const item of old) {
      $cells[item].classList.remove("selected");
    }
  }

  for (const item of value) {
    $cells[item].classList.add("selected");
  }
});

vm.turn.subscribe(() => {
  const message = vm.turn.value === "black" ? "pretas" : "brancas";
  $team.textContent = `peças ${message}`;
});

vm.pieces.subscribe((value, old) => {
  const valueMap = new Map(value.map((s) => [s.cell, s]));
  if (old) {
    for (const item of old) {
      const valueResult = valueMap.get(item.cell) ?? null;
      if (valueResult === null || !isSame(valueResult, item)) {
        $cells[item.cell].innerHTML = "";
      }
    }
  }

  const oldMap = new Map((old ?? []).map((s) => [s.cell, s]));
  for (const item of value) {
    const oldValue = oldMap.get(item.cell) ?? null;
    if (oldValue === null || !isSame(item, oldValue)) {
      const img = document.createElement("img");
      img.src = pieceToSvg(item);
      $cells[item.cell].appendChild(img);
    }
  }
});

vm.round.subscribe((value) => $round.textContent = `${value}`);

vm.captured.subscribe((value) => {
  const grouped = Object.groupBy(value, (s) => s.team);
  $capturedBlack.textContent = `${grouped["black"]?.length ?? 0}`;
  $capturedWhite.textContent = `${grouped["white"]?.length ?? 0}`;
});

vm.check.subscribe((value) => {
  $messageCheck.textContent = value;
});

vm.turn.notify();
vm.pieces.notify();
vm.origin.notify();
vm.highlight.notify();
vm.round.notify();
vm.captured.notify();

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
