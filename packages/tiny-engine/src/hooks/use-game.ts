import { Game } from '../core/game.js'
import type { GameControls } from '../jsx/render/game.js'
import { pushEffect } from './context.js'

/**
 * The **`useGame`** hooks gets the game controls.
 *
 * @example
 * ```tsx
 * const game = useGame()
 *
 * const handleStart = () => {
 *   game.pause()
 * }
 *
 * return <node onStart={handleStart} />
 * ```
 */
export function useGame(): GameControls {
  pushEffect('useGame', () => {})

  return {
    play: () => Game.play(),
    pause: () => Game.pause(),
    changeScene: (name) => {
      return Game.sceneManager.setScene(name)
    },
    preloadScene: (name) => {
      return Game.sceneManager.preloadScene(name)
    },
  }
}
