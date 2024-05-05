import { MoveDown } from "../behaviors/move-down";
import { SortByMass } from "../behaviors/sort-by-mass";
import { Behavior } from "../core/behavior";
import { Grid } from "../core/grid";
import { Particle } from "../core/particle";

export class Sand extends Particle {
  static baseColor = "#dcb159";
  static mass = 2;
  static behaviors: Behavior[] = [
    new SortByMass(),
    new MoveDown(),
  ];

  constructor(grid: Grid) {
    super(grid, Sand.baseColor, Sand.mass, Sand.behaviors);
  }
}