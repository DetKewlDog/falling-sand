import { Behavior } from "../core/behavior";
import { Grid } from "../core/grid";
import { Particle } from "../core/particle";
import { Point } from "../types";

export class MoveSideways extends Behavior {
  update(p: Particle, pos: Point, grid: Grid): boolean {
    let newPos = { x: pos.x, y: pos.y };
    const dir = p.lastDir || (Math.random() > 0.5 ? 1 : -1);
    const checkOrder = dir === -1 ? [-1, 1] : [1, -1];
    for (const dx of checkOrder) {
      newPos.x = pos.x + dx;
      const other = grid.get(newPos);
      if (other === undefined) continue;
      if (other && (other.mass === -1 || other.mass >= p.mass)) {
        continue;
      }
  
      grid.swap(pos, newPos);
      p.lastDir = dx;
      return true;
    }
    p.lastDir = 0;
    return false;
  }
}