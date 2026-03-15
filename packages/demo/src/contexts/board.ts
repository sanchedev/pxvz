import { Vector2 } from 'tiny-engine'
import { createContext } from 'tiny-engine/hooks'

export interface BoardContext {
  cellSize: Vector2
  cellsCount: Vector2
}

export const BoardCtx = createContext<BoardContext>({
  cellSize: Vector2.ZERO,
  cellsCount: Vector2.ZERO,
})
