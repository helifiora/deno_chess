// @ts-nocheck asd
import type { PieceType } from "@/domain/piece/piece.ts";
import type { Team } from "@/domain/team.ts";

import BlackKnight from "../../icons/black-knight.svg";
import BlackRook from "../../icons/black-rook.svg";
import BlackBishop from "../../icons/black-bishop.svg";
import BlackPawn from "../../icons/black-pawn.svg";
import BlackQueen from "../../icons/black-queen.svg";
import BlackKing from "../../icons/black-king.svg";

import WhiteKnight from "../../icons/white-knight.svg";
import WhiteRook from "../../icons/white-rook.svg";
import WhiteBishop from "../../icons/white-bishop.svg";
import WhitePawn from "../../icons/white-pawn.svg";
import WhiteQueen from "../../icons/white-queen.svg";
import WhiteKing from "../../icons/white-king.svg";

type Props = {
  type: PieceType;
  team: Team;
};

export default function AppPiece(props: Props) {
  return (
    <img
      src={getImage(props.type, props.team)}
      alt={`${props.team}-${props.type}`}
    />
  );
}

function getImage(type: PieceType, team: Team): string {
  switch (type) {
    case "rook":
      return team === "black" ? BlackRook : WhiteRook;
    case "knight":
      return team === "black" ? BlackKnight : WhiteKnight;
    case "pawn":
      return team === "black" ? BlackPawn : WhitePawn;
    case "king":
      return team === "black" ? BlackKing : WhiteKing;
    case "queen":
      return team === "black" ? BlackQueen : WhiteQueen;
    case "bishop":
      return team === "black" ? BlackBishop : WhiteBishop;
  }
}
