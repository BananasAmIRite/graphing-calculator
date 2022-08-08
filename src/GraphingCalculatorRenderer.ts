import GraphingCalculator from './GraphingCalculator';

export default class GraphingCalculatorRenderer {
  private unitWidth: number;
  private unitHeight: number;
  private renderingAccuracy: number = 0.01;
  private offsetX: number;
  private offsetY: number;

  public constructor(private canvas: HTMLCanvasElement, private calculator: GraphingCalculator) {
    this.unitWidth = canvas.width / 20;
    this.unitHeight = canvas.height / 20;
    this.offsetX = -canvas.width / 2;
    this.offsetY = -canvas.height / 2;
    this.setupListeners();
    this.render();
  }

  private setupListeners() {
    let isMouseDown = false;
    this.canvas.addEventListener('mousedown', () => {
      isMouseDown = true;
    });
    this.canvas.addEventListener('mouseup', () => {
      isMouseDown = false;
    });
    this.canvas.addEventListener('mousemove', (e) => {
      if (isMouseDown) {
        this.offsetX -= e.movementX;
        this.offsetY -= e.movementY;
      }
    });
  }

  public render() {
    // get the number from the offset
    // NOTE: x is not inverted from pixels, y IS

    const leftNumX = this.offsetX / this.unitWidth;
    const rightNumX = (this.offsetX + this.canvas.width) / this.unitWidth;
    const topNumY = -this.offsetY / this.unitHeight;
    const bottomNumY = (-this.offsetY - this.canvas.height) / this.unitHeight;

    const ctx = this.canvas.getContext('2d');

    ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!ctx) throw new Error('No rendering context found');

    ctx.strokeStyle = 'gray';

    this.drawLine(ctx, leftNumX, 0, rightNumX, 0);
    this.drawLine(ctx, 0, topNumY, 0, bottomNumY);

    ctx.strokeStyle = 'black';

    for (const func of this.calculator.getFunctions()) {
      ctx.beginPath();
      let isLastPointConnected = false;

      for (
        let x = func.useBounds ? Math.max(leftNumX, func.lowerBound) : leftNumX;
        x < (func.useBounds ? Math.min(rightNumX, func.upperBound) : rightNumX);
        x += this.renderingAccuracy
      ) {
        const point = this.calcStrokePoint(ctx, x, func.function(x));
        if (!point) {
          isLastPointConnected = false;
          continue;
        }

        if (!isLastPointConnected) {
          ctx.stroke();
          ctx.moveTo(point.x, point.y);
        } else ctx.lineTo(point.x, point.y);
        // this.strokePoint(ctx, x, func(x));

        isLastPointConnected = true;
      }
      ctx.stroke();
    }

    requestAnimationFrame(() => this.render());
  }

  private calcStrokePoint(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // const leftNumX = this.offsetX / this.unitWidth;
    // const rightNumX = (this.offsetX + this.canvas.width) / this.unitWidth;
    // const topNumY = -this.offsetY / this.unitHeight;
    // const bottomNumY = (-this.offsetY - this.canvas.height) / this.unitHeight;

    // if (leftNumX > x || rightNumX < x || bottomNumY > y || topNumY < y) return;

    return { x: x * this.unitWidth - this.offsetX, y: -y * this.unitHeight - this.offsetY }; // TODO: modify idk
  }

  private drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
    const pt1 = this.calcStrokePoint(ctx, x1, y1);
    const pt2 = this.calcStrokePoint(ctx, x2, y2);

    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.stroke();
  }
}
