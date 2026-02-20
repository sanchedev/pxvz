import { Vector2 } from './classes/vector2.js'

export class GameConfig {
  static canvas: HTMLCanvasElement
  static ctx: CanvasRenderingContext2D
  static width: number
  static height: number

  static translate = Vector2.ZERO
}

interface GCO {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number
}

export function _set_gc({ canvas, ctx, width, height }: GCO) {
  GameConfig.canvas = canvas
  GameConfig.ctx = ctx
  GameConfig.width = width
  GameConfig.height = height
}
