import GraphingCalculator, { MathFunction } from './GraphingCalculator';

const elem = document.getElementById('canvas');

if (!elem || !(elem instanceof HTMLCanvasElement)) throw new Error('No element found');

const arr: MathFunction[] = [];
for (let i = 0; i < 10; i++) {
  arr.push((x) => Math.pow(x, i));
}

// @ts-ignore
window.graphingCalculator = new GraphingCalculator(elem, [(x) => Math.floor(x), (x) => Math.ceil(x)]);
