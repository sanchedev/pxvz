import type { Node } from '../nodes/node.js'
import type { Add } from './add.js'
import { type NodEv } from './utils.js'

export function addUpdate<T extends Node>(
  fn: NodEv<T, Node['updated']>,
  adds: Add<T>[],
) {
  const add: Add<T> = (node) => {
    node.updated.on((...args) => fn(node, ...args))
  }

  adds.push(add)
}
