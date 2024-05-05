import { Grid } from "./grid";
import { Point } from "../types";
import { Particle } from "./particle";

export class Behavior {
  update(p: Particle | null, pos: Point, grid: Grid): boolean {
    p; pos; grid;
    return false;
  }
}