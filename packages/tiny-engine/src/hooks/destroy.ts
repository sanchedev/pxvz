import type { TypeElements } from '../nodes/types.js'
import { pushEffect } from './context.js'

/**
 * The **`useDestroy`** hooks call `fn` when the node is destroyed.
 * @param fn Function to call
 */
export function useDestroy<T extends keyof TypeElements = 'node'>(
  fn: (node: TypeElements[T]) => void,
) {
  pushEffect((node) => {
    node.destroyed.on(() => fn(node as TypeElements[T]))
  })
}
