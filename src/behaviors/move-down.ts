import { Behavior } from "../core/behavior";
import { Grid } from "../core/grid";
import { Particle } from "../core/particle";
import { Point } from "../types";

export class MoveDown extends Behavior {
  update(p: Particle, pos: Point, grid: Grid): boolean {
    let newPos = { x: pos.x, y: pos.y - 1 };
    const dir = Math.random() > 0.5 ? 1 : -1;
    const checkOrder = dir === -1 ? [0, -1, 1] : [0, 1, -1];
    for (const dx of checkOrder) {
      newPos.x = pos.x + dx;
      const other = grid.get(newPos);
      if (other === undefined || (other && (other.mass === -1 || other.mass >= p.mass))) {
        continue;
      }
  
      grid.set(newPos, p);
      grid.set(pos, null);
      p.lastDir = dx;
      return true;
    }
    p.lastDir = 0;
    return false;
  }
}