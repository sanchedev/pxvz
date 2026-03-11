import { Fragment } from '../jsx/components/fragment.js'
import type { Tiny } from '../jsx/types.js'
import { currentContext } from './context.js'

export function createContext<T>(defaultValue: T) {
  return new ContextCreated<T>(defaultValue)
}

export function useContext<T>(contextCreated: ContextCreated<T>): T {
  let context: T | undefined

  for (let i = currentContext.length - 1; i >= 0; i--) {
    const ctx = currentContext[i]!

    if (ctx.context?.id !== contextCreated.__id) continue
    context = ctx.context.value
  }

  return context ?? contextCreated.defaultValue
}

class ContextCreated<T> {
  __id: number
  defaultValue: T

  constructor(defaultValue: T) {
    this.defaultValue = defaultValue
    this.__id = genContextId()
  }

  Provider = (props: Tiny.WithChildren<{ value: T }>) => {
    const ctx = currentContext.at(-1)
    if (ctx) {
      ctx.context = { id: this.__id, value: props.value }
    }
    return Fragment(props)
  }
}

export interface Context<T> {
  id: number
  value: T
}

let counter = 0
function genContextId() {
  return ++counter
}
