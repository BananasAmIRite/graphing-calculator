import GraphingCalculator, { MathFunction } from './GraphingCalculator';
import GraphingCalculatorRenderer from './GraphingCalculatorRenderer';
import { createPolynomialInterpolation } from './Interpolation';

const elem = document.getElementById('canvas');

if (!elem || !(elem instanceof HTMLCanvasElement)) throw new Error('No element found');

const arr: MathFunction[] = [];
for (let i = 0; i < 1; i++) {
  arr.push((x) => x * Math.sin(Math.pow(x, x)));
}

const vals = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  //   { x: 2, y: -2 },
  //   { x: 3, y: 4 },
  //   { x: 4, y: 8 },
  //   { x: 5, y: -7 },
  //   { x: 6, y: -12 },
];

const interpolationLine = createPolynomialInterpolation(vals);

// @ts-ignore
const graphingCalculator = new GraphingCalculator(elem);

window.addEventListener('mousedown', (e) => {
  vals.push(graphingCalculator.getRenderer().canvasToCoord(e.offsetX, e.offsetY));
});

// graphingCalculator.getRenderer().addRenderer((ctx: CanvasRenderingContext2D, renderer: GraphingCalculatorRenderer) => {
//   for (const val of vals) {
//     renderer.drawPoint(ctx, val.x, val.y);
//   }
// });
// graphingCalculator.addFunction(interpolationLine);
// graphingCalculator.addFunction((x) => Math.pow(2, x));
graphingCalculator.addFunction((x) => 10);

// for (const a of arr) {
//   graphingCalculator.addFunction(a);
// }
