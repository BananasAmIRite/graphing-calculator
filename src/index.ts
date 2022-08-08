import GraphingCalculator, { MathFunction } from './GraphingCalculator';

const elem = document.getElementById('canvas');

if (!elem || !(elem instanceof HTMLCanvasElement)) throw new Error('No element found');

const arr: MathFunction[] = [];
for (let i = 0; i < 10; i++) {
  arr.push((x) => Math.pow(x, i));
}

// @ts-ignore
const graphingCalculator = new GraphingCalculator(elem);

for (const a of arr) {
  graphingCalculator.addFunction(a, { useBounds: true, lowerBound: 0, upperBound: 10 });
}
