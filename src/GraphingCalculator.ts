import GraphingCalculatorRenderer from './GraphingCalculatorRenderer';

export type MathFunction = (x: number) => number;

export default class GraphingCalculator {
  private functions: MathFunction[];
  private renderer: GraphingCalculatorRenderer;
  public constructor(canvas: HTMLCanvasElement, functions: MathFunction[] = []) {
    this.functions = functions ?? [];
    this.renderer = new GraphingCalculatorRenderer(canvas, this);
  }

  public getFunctions() {
    return this.functions;
  }

  public addFunction(func: MathFunction) {
    this.functions.push(func);
  }
}
