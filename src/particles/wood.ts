import { Behavior } from "../core/behavior";
import { Grid } from "../core/grid";
import { Particle } from "../core/particle";

export class Wood extends Particle {
  static baseColor = "#803E00";
  static mass = -1;
  static behaviors: Behavior[] = [];

  constructor(grid: Grid) {
    super(grid, Wood.baseColor);
  }
}