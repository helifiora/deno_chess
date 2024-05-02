import { assert, assertEquals, assertNotStrictEquals } from "@std/assert";
import { Board } from "@/domain/board.ts";
import { Cell } from "@/domain/cell.ts";
import { toDirection } from "@/domain/direction.ts";
import { take } from "@/generator.ts";
import { Position, PositionIncrement } from "@/domain/position.ts";
import { invertTeam, Team } from "@/domain/team.ts";
import {
  createSequence,
  fakePieceData,
  generateValidCell,
  toSetCell,
} from "../helpers/helpers.ts";

function toIncrement(team: Team): PositionIncrement {
  return toDirection(team) === "top" ? { y: -1 } : { y: 1 };
}

function kingBehindPawn(position: Position, team: Team): Position {
  const x = position.x;
  const increment = toIncrement(invertTeam(team));
  let y = position.y + (increment.y ?? 0);
  if (y < 0) {
    y = Position.max;
  }

  if (y > Position.max) {
    y = 0;
  }

  return new Position(x, y);
}

function toExpected(cell: Cell, team: Team, limit: number): Set<Cell> {
  const direction = toDirection(team);
  const increment = direction === "top" ? { y: -1 } : { y: 1 };
  const origin = Position.fromCell(cell);
  const generator = createSequence(origin, increment);
  return toSetCell(take(generator, limit));
}

for (const team of ["black", "white"] as Team[]) {
  for (const cell of generateValidCell()) {
    Deno.test(
      `Should move 2 cells forward with First move: ${team} ${cell}`,
      () => {
        const expected = toExpected(cell, team, 2);

        const kingPosition = kingBehindPawn(Position.fromCell(cell), team);
        const kingCell = kingPosition.toCell();

        const board = Board.restore([
          fakePieceData({ cell: kingCell, type: "king", team }),
          fakePieceData({ cell, team, moveCount: 0, type: "pawn" }),
        ]);

        const piece = board.get(Position.fromCell(cell))!;
        const result = toSetCell(piece.moves());

        assertEquals(result, expected);
      },
    );

    Deno.test(`Should move 1 cell forward: ${team} ${cell}`, () => {
      const expected = toExpected(cell, team, 1);

      const position = Position.fromCell(cell);
      const kingPosition = kingBehindPawn(position, team);
      const kingCell = kingPosition.toCell();
      const board = Board.restore([
        fakePieceData({ cell: kingCell, type: "king", team }),
        fakePieceData({ cell, team, moveCount: 1, type: "pawn" }),
      ]);

      const piece = board.get(Position.fromCell(cell))!;
      const result = toSetCell(piece.moves());

      assertEquals(result, expected);
    });
  }

  Deno.test(`Should enemy block forward path: ${team}`, () => {
    const increment = toIncrement(team);

    const enemyPosition = Position.increment(
      Position.fromCell("c4"),
      increment,
    );
    assert(enemyPosition.isOk());
    const enemyCell = enemyPosition.data.toCell();

    const board = Board.restore([
      fakePieceData({ cell: "h1", type: "king", team }),
      fakePieceData({ cell: "c4", moveCount: 1, team, type: "pawn" }),
      fakePieceData({ cell: enemyCell, team: invertTeam(team) }),
    ]);

    const piece = board.get(Position.fromCell("c4"))!;
    const result = toSetCell(piece.moves());
    assertEquals(result, new Set());
  });

  Deno.test(`Should ally block forward path: ${team}`, () => {
    const increment = toIncrement(team);

    const allyPosition = Position.increment(Position.fromCell("c4"), increment);
    assert(allyPosition.isOk());
    const allyCell = allyPosition.data.toCell();

    const board = Board.restore([
      fakePieceData({ cell: "h1", team, type: "king" }),
      fakePieceData({ cell: "c4", moveCount: 1, team, type: "pawn" }),
      fakePieceData({ cell: allyCell, team }),
    ]);

    const piece = board.get(Position.fromCell("c4"))!;
    const result = toSetCell(piece.moves());
    assertEquals(result, new Set());
  });

  Deno.test(`Should include diagonal with enemy piece: ${team}`, () => {
    const cell: Cell = "c4";
    const origin = Position.fromCell(cell);

    const increment = toIncrement(team);

    const diagonalPosition = Position.increment(origin, { ...increment, x: 1 });

    assert(diagonalPosition.isOk());
    const diagonalCell = diagonalPosition.data.toCell();

    const verticalPosition = Position.increment(origin, increment);
    assert(verticalPosition.isOk());
    const verticalCell = verticalPosition.data.toCell();

    const board = Board.restore([
      fakePieceData({ cell: "h1", type: "king", team }),
      fakePieceData({ cell: "c4", moveCount: 1, team, type: "pawn" }),
      fakePieceData({ team: invertTeam(team), cell: verticalCell }),
      fakePieceData({ cell: diagonalCell, team: invertTeam(team) }),
    ]);

    const piece = board.get(origin)!;
    const result = toSetCell(piece.moves());
    assertEquals(result, new Set([diagonalCell]));
  });

  Deno.test(`Should not include diagonal with ally piece: ${team}`, () => {
    const cell: Cell = "c4";
    const origin = Position.fromCell(cell);

    const increment = toDirection(team) === "top" ? { y: -1 } : { y: 1 };

    const diagonalPosition = Position.increment(origin, { ...increment, x: 1 });

    assert(diagonalPosition.isOk());
    const diagonalCell = diagonalPosition.data.toCell();

    const verticalPosition = Position.increment(origin, increment);
    assert(verticalPosition.isOk());
    const verticalCell = verticalPosition.data.toCell();

    const board = Board.restore([
      fakePieceData({ cell: "h1", team, type: "king" }),
      fakePieceData({ cell: "c4", moveCount: 1, team, type: "pawn" }),
      fakePieceData({ cell: verticalCell, team }),
      fakePieceData({ cell: diagonalCell, team }),
    ]);

    const piece = board.get(origin)!;
    const result = toSetCell(piece.moves());
    assertEquals(result, new Set<Cell>());
  });
}

Deno.test("Should clone", () => {
  const board = Board.restore([
    fakePieceData({ cell: "a1", type: "pawn" }),
  ]);

  const piece = board.get(Position.fromCell("a1"))!;

  const clonedPiece = board.clone().get(Position.fromCell("a1"))!;

  assertNotStrictEquals(piece, clonedPiece);
});
