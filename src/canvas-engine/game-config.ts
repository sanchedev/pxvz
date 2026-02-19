class GameConfig {
  constructor(
    public readonly canvas: HTMLCanvasElement,
    public readonly ctx: CanvasRenderingContext2D,
    public readonly width: number,
    public readonly height: number,
  ) {}
}

const gc: { current: GameConfig | null } = {
  current: null,
}

interface GCO {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number
}

export function _set_gc({ canvas, ctx, width, height }: GCO) {
  gc.current = new GameConfig(canvas, ctx, width, height)
}

export function getGameConfig() {
  if (gc.current == null) {
    throw new Error('The game has not been set.')
  }

  return gc.current
}
