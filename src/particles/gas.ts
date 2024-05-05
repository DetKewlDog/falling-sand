import { MoveSideways } from "../behaviors/move-sideways";
import { MoveUp } from "../behaviors/move-up";
import { SortByMass } from "../behaviors/sort-by-mass";
import { Behavior } from "../core/behavior";
import { Grid } from "../core/grid";
import { Particle } from "../core/particle";

export class Gas extends Particle {
  static baseColor = "#404040";
  static mass = 0.333;
  static behaviors: Behavior[] = [
    new SortByMass(),
    new MoveUp(),
    new MoveSideways(),
  ];

  constructor(grid: Grid) {
    super(grid, Gas.baseColor, Gas.mass, Gas.behaviors);
  }
}