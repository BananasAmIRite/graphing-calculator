import { MathFunction } from './GraphingCalculator';

export const createPolynomialInterpolation: (p: { x: number; y: number }[]) => MathFunction = (points) => {
  return (x) => {
    let val = 0;

    for (let outer = 0; outer < points.length; outer++) {
      const y = points[outer].y;
      let top = 1;
      let bottom = 1;
      for (let i = 0; i < points.length; i++) {
        if (i === outer) continue;
        top *= x - points[i].x;
        bottom *= points[outer].x - points[i].x;
      }
      val += (top / bottom) * y;
    }
    return val;
  };
};
