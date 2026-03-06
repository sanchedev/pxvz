import type { Theme } from './theme.js'
import { Vector2 } from '../math/vector2.js'

export class GameConfig {
  static canvas: HTMLCanvasElement
  static ctx: CanvasRenderingContext2D
  static width: number
  static height: number

  static theme: Theme

  static translate = Vector2.ZERO
}

interface GCO {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  theme: Theme
}

export function _set_gc({ canvas, ctx, width, height, theme }: GCO) {
  GameConfig.canvas = canvas
  GameConfig.ctx = ctx
  GameConfig.width = width
  GameConfig.height = height
  GameConfig.theme = theme
}
