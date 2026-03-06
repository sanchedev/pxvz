import type { Node } from '../nodes/node.js'

export interface HookContext {
  node: Node | null
  effects: ((node: Node) => void)[]
}

let currentContext: HookContext[] = []

export function startHooks() {
  console.log('startHooks')
  currentContext.push({
    node: null,
    effects: [],
  })
}

export function finishHooks(node: Node) {
  console.log('end', node)
  if (!currentContext) return

  currentContext.at(-1)?.effects.forEach((fn) => fn(node))
  currentContext.pop()
}

export function pushEffect(effect: (node: Node) => void) {
  if (!currentContext) {
    throw new Error('Hooks can only be used inside components.')
  }

  currentContext.at(-1)?.effects.push(effect)
}
