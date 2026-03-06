import type { Node } from '../nodes/node.js'
import { pushEffect } from './context.js'

export function useUpdate<T extends Node = Node>(
  fn: (node: T, delta: number) => void,
) {
  pushEffect((node) => {
    node.updated.on((delta) => fn(node as T, delta))
  })
}
