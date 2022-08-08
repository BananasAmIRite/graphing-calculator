export type RenderMethod = (ctx: CanvasRenderingContext2D) => void;

export default abstract class Renderer {
  private renderMethods: RenderMethod[];
  public constructor(protected canvas: HTMLCanvasElement) {
    this.renderMethods = [];
  }

  public render() {
    const ctx = this.canvas.getContext('2d');

    ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!ctx) throw new Error('No rendering context found');

    for (const m of this.renderMethods) {
      m(ctx);
    }

    requestAnimationFrame(() => this.render());
  }

  public addRenderer(renderer: RenderMethod) {
    this.renderMethods.push(renderer);
  }
}
