import './style.css';
import { Grid, particles } from './core/grid';
import { Particle } from './core/particle';

const FPS = 200;

const root = document.querySelector<HTMLDivElement>('#app')!;

const canvas = root.querySelector<HTMLCanvasElement>('#canvas')!;
const grid = new Grid(canvas, FPS);

const text = root.querySelector<HTMLParagraphElement>('#text')!

let currentParticle: typeof Particle;


setInterval(() => {
  currentParticle = particles[grid.particleIndex];
  text.innerText = currentParticle.name + '\n' + Object.entries(grid.dataToDisplay).map(([k, v]) => `${k}: ${v}`).join('\n');
}, 1000 / FPS);