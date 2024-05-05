import { Particle } from "./particle";
import { Point } from "../types";

import { Sand } from "../particles/sand";
import { Water } from "../particles/water";
import { Gas } from "../particles/gas";
import { Wood } from "../particles/wood";

const PIXEL_SIZE = 4;
const DRAW_SIZE = 2;
export const particles = [
  Wood,
  Sand,
  Water,
  Gas
];

export class Grid {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private grid: (Particle | null)[][];

  width: number;
  height: number;

  particleIndex: number;

  private modifiedIndices: Set<Point>;

  dataToDisplay: Record<string, string> = {};

  constructor(canvas: HTMLCanvasElement, fps: number) {
    fps /= 2;

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    this.width = Math.floor(window.innerWidth / PIXEL_SIZE);
    this.height = Math.floor(window.innerHeight / PIXEL_SIZE);

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.grid = new Array(this.height).fill(null).map(
      () => new Array(this.width).fill(null)
    );

    this.modifiedIndices = new Set<Point>(
      [...Array(this.width * this.height).keys()]
      .map(i => ({ 
        x: Math.floor(i / this.height), 
        y: i % this.height 
      }))
    );

    this.particleIndex = 0;

    let holdInterval: number;

    let x: number;
    let y: number;

    this.canvas.addEventListener('wheel', e => {
      const change = e.deltaY > 0 ? -1 : 1;
      const len = particles.length;
      this.particleIndex = (this.particleIndex + change + len) % len;
    })

    this.canvas.addEventListener('mousemove', e => {
      [x, y] = [e.clientX, e.clientY].map(i => Math.floor(i / PIXEL_SIZE));
      y = this.height - y - 1;
    });

    this.canvas.addEventListener('contextmenu', e => e.preventDefault());

    this.canvas.addEventListener('mousedown', e => {
      holdInterval = setInterval(() => {
        for (let _y = y - DRAW_SIZE; _y <= y + DRAW_SIZE; _y++) {
          for (let _x = x - DRAW_SIZE; _x <= x + DRAW_SIZE; _x++) {
            const pos = { x: _x, y: _y };
            const removing = e.button == 2;

            if (!removing && !!this.get(pos)) continue;

            this.set(
              pos, 
              removing ? null : new particles[this.particleIndex](this)
            );
          }
        }
      }, 0);
    });

    this.canvas.addEventListener('mouseup', () => clearInterval(holdInterval));

    this.modifiedIndices.forEach(pos => this.drawPixel(pos));

    setInterval(async () => {
      this.postUpdate();

      this.grid
      .forEach((row, y) => {
        row.map((p, x) => [p, x] as [Particle, number])
        .forEach(([p, x]) =>
          p?.update({ x, y })
        )
      });

      this.postUpdate();

      this.grid
      .forEach((row, y) => {
        row.map((p, x) => [p, x] as [Particle, number])
        .reverse()
        .forEach(([p, x]) =>
          p?.update({ x, y })
        )
      });

      const cells = this.grid.flat(1).filter(i => !!i);

      particles.map(i => i.name.toString()).forEach(p => {
        this.dataToDisplay[`${p} cells`] = cells.filter(i => i?.constructor.name === p).length.toString();
      })
    }, 1000 / fps);
  }

  postUpdate() {
    this.modifiedIndices.forEach(({ x, y }) => {
      if (!this.grid[y][x]) {
        return;
      }
      this.grid[y][x]!.updated = false;
    });

    this.modifiedIndices.clear();
  }

  inBounds(pos: Point) {
    return pos.x >= 0 && pos.y >= 0 && pos.x < this.width && pos.y < this.height;
  }

  get(pos: Point) {
    if (!this.inBounds(pos)) return undefined;
    return this.grid[pos.y][pos.x];
  }

  set(pos: Point, p: Particle | null) {
    if (!this.inBounds(pos)) return;
    p && (p.updated = true);
    this.grid[pos.y][pos.x] = p;
    this.modifiedIndices.add(pos);
    this.drawPixel(pos);
  }

  swap(a: Point, b: Point) {
    if (!this.inBounds(a)) return;
    if (!this.inBounds(b)) return;

    const temp = this.grid[a.y][a.x];
    this.grid[a.y][a.x] = this.grid[b.y][b.x];
    this.grid[b.y][b.x] = temp;

    this.modifiedIndices.add(a);
    this.modifiedIndices.add(b);

    this.grid[a.y][a.x] && (this.grid[a.y][a.x]!.updated = true);
    this.grid[b.y][b.x] && (this.grid[b.y][b.x]!.updated = true);

    this.drawPixel(a);
    this.drawPixel(b);
  }

  drawPixel(pos: Point) {
    const { x, y } = pos;
    const p = this.grid[y][x];
    const color = !!p ? p.color : 'black';
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * PIXEL_SIZE, (this.height - y - 1) * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
  }
}