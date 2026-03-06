import type { TypeElements } from '../nodes/types.js'
import { pushEffect } from './context.js'

/**
 * The **`useDraw`** hooks call `fn` when the node draws.
 * @param fn Function to call
 */
export function useDraw<T extends keyof TypeElements = 'node'>(
  fn: (node: TypeElements[T], delta: number) => void,
) {
  pushEffect((node) => {
    node.drawed.on((delta) => fn(node as TypeElements[T], delta))
  })
}
