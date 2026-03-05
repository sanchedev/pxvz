import type { Node } from '../../nodes/node.js'
import type { Add } from './add.js'
import { type NodEv } from './utils.js'

export function addStart<T extends Node>(
  fn: NodEv<T, Node['started']>,
  adds: Add<T>[],
) {
  const add: Add<T> = (node) => {
    node.started.on((...args) => fn(node, ...args))
  }

  adds.push(add)
}
