import GraphingCalculatorRenderer from './GraphingCalculatorRenderer';

export type MathFunction = (x: number) => number;

export interface FunctionOptions {
  useBounds: boolean;
  lowerBound: number;
  upperBound: number;
}

export interface GraphableFunction extends FunctionOptions {
  function: MathFunction;
}

export default class GraphingCalculator {
  private functions: GraphableFunction[];
  private renderer: GraphingCalculatorRenderer;
  public constructor(canvas: HTMLCanvasElement) {
    this.functions = [];
    this.renderer = new GraphingCalculatorRenderer(canvas, this);
  }

  public getFunctions() {
    return this.functions;
  }

  public addFunction(
    func: MathFunction,
    options: FunctionOptions = {
      useBounds: false,
      lowerBound: 0,
      upperBound: 0,
    }
  ) {
    this.functions.push({
      function: func,
      ...options,
    });
  }
}
