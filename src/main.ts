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
  const temp = particles[grid.particleIndex];
  if (temp === currentParticle) return;
  currentParticle = temp;
  text.innerText = currentParticle.name;
}, 1000 / FPS);