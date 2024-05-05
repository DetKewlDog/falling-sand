import { hexToRGB, randomColor } from "../helpers";
import { Point } from "../types";
import { Behavior } from "./behavior";
import { Grid } from "./grid";

export class Particle {
  grid: Grid;
  color: string;
  behaviors: Behavior[];
  updated: boolean = false;
  lastDir: number = 0;
  mass: number = 0;

  constructor(grid: Grid, color: string, mass: number = -1, behaviors: Behavior[] = [], alpha: number = 1, randomizeColor: boolean = true) {
    this.grid = grid;
    this.color = randomizeColor 
    ? randomColor(color, alpha) 
    : hexToRGB(color, alpha);
    this.mass = mass;
    this.behaviors = behaviors;
  }

  update(pos: Point) {
    if (this.updated) return;
    for (let b of this.behaviors) {
      if (b.update(this, pos, this.grid)) {
        this.updated = true;
        break;
      }
    }
  }
}