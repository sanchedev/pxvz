import type { Node } from '../nodes/node.js'
import { pushEffect } from './context.js'

export function useStart<T extends Node = Node>(fn: (node: T) => void) {
  pushEffect((node) => {
    node.started.on(() => fn(node as T))
  })
}
