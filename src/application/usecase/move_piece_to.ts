import type { Cell } from "../../domain/cell.ts";
import type { PieceDataPositionless } from "../../domain/piece.ts";
import type { GameData } from "../../game.ts";
import { Board } from "../../domain/board.ts";
import { Position } from "../../domain/position.ts";
import { invertTeam, type Team } from "../../domain/team.ts";
import { err, ok, type Result } from "../../result.ts";
import {
  NoDestinyInMovesError,
  NoPieceInCellError,
  NoPieceTurnError,
  SameOriginAndDestinyError,
  SameTeamFromOriginAndTargetError,
} from "./errors.ts";
import { isInCheck, isInCheckmate } from "../../domain/check.ts";

type Input = { origin: Cell; target: Cell };

type GameDataResult = GameData & { isCheck: Team | null; isCheckmate: boolean };

type Output = Result<
  GameDataResult,
  | NoPieceInCellError
  | NoPieceTurnError
  | NoDestinyInMovesError
  | SameOriginAndDestinyError
  | SameTeamFromOriginAndTargetError
>;

export function movePieceTo(data: GameData, input: Input): Output {
  if (input.origin === input.target) {
    return err(new SameOriginAndDestinyError(input.origin));
  }

  const board = Board.restore(data.pieces);
  const piece = board.get(Position.fromCell(input.origin));

  if (piece === null) {
    return err(new NoPieceInCellError(input.origin));
  }

  if (piece.team !== data.turn) {
    return err(new NoPieceTurnError(data.turn, piece.team));
  }

  const targetPiece = board.get(Position.fromCell(input.target));
  if (targetPiece?.hasSameTeam(piece)) {
    return err(new SameTeamFromOriginAndTargetError(piece.team));
  }

  const targetPosition = Position.fromCell(input.target);
  if (!piece.canMoveTo(targetPosition)) {
    return err(new NoDestinyInMovesError(input.target));
  }

  const capturedPiece = board.move(piece, targetPosition);
  piece.increaseCount();

  const isCheck = isInCheck(board);
  const isCheckmate = isCheck !== null ? isInCheckmate(board, isCheck) : false;

  return ok({
    capturedPieces: addCapturedPiece(data, capturedPiece),
    isCheck,
    isCheckmate,
    pieces: board.toData(),
    round: data.round + 1,
    turn: invertTeam(data.turn),
  });
}

function addCapturedPiece(data: GameData, captured: PieceDataPositionless | null): PieceDataPositionless[] {
  if (captured) {
    return [...data.capturedPieces, captured];
  }

  return [...data.capturedPieces];
}
