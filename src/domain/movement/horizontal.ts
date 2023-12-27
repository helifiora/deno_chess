import type { Position, PositionIncrement } from "../position.ts";
import { Sequence } from "./sequence.ts";
import { merge } from "../../generator.ts";

export class Horizontal extends Sequence {
  static leftIncrement: PositionIncrement = { x: -1 };
  static rightIncrement: PositionIncrement = { x: 1 };

  execute(): Generator<Position> {
    const leftGenerator = this.sequence(Horizontal.leftIncrement);
    const rightGenerator = this.sequence(Horizontal.rightIncrement);
    return merge(leftGenerator, rightGenerator);
  }
}
