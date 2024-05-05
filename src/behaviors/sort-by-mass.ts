import { Behavior } from "../core/behavior";
import { Grid } from "../core/grid";
import { Particle } from "../core/particle";
import { Point } from "../types";

export class SortByMass extends Behavior {
  update(p: Particle, pos: Point, grid: Grid): boolean {
    let newPos = { x: pos.x, y: pos.y + 1 };
    const above = grid.get(newPos);
    if (above && above.mass === -1) return false;
    if (above && above.mass > p.mass) {
      grid.swap(pos, newPos);
      return true;
    }
    return false
  }
}