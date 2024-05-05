import { MoveDown } from "../behaviors/move-down";
import { MoveSideways } from "../behaviors/move-sideways";
import { SortByMass } from "../behaviors/sort-by-mass";
import { Behavior } from "../core/behavior";
import { Grid } from "../core/grid";
import { Particle } from "../core/particle";

export class Water extends Particle {
  static baseColor = "#1178ff";
  static mass = 1;
  static behaviors: Behavior[] = [
    new SortByMass(),
    new MoveDown(),
    new MoveSideways(),
  ];

  constructor(grid: Grid) {
    super(grid, Water.baseColor, Water.mass, Water.behaviors, 0.75, false);
  }
}