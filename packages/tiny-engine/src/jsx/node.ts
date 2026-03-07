import type { Node } from '../nodes/node.js'
import { Nodes, type NodesOptions, type NodeToOptions } from '../nodes/types.js'

export function getNodeFromKey<T extends keyof typeof Nodes>(
  type: T,
  props: NodesOptions[T],
): (typeof Nodes)[T]['prototype'] {
  return getNodeFromClass(Nodes[type], props)
}

export function getNodeFromComp<T extends {}, K extends Node>(
  func: (props: T) => K,
  props: T,
): K {
  return func(props)
}

export function getNodeFromClass<T extends typeof Node>(
  nodeClass: T,
  props: NodeToOptions<T>,
) {
  return new nodeClass(props)
}
