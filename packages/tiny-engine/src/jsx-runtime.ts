import { finishHooks, startHooks } from './hooks/context.js'
import { Node, type NodeOptions } from './nodes/index.js'

type TinyComponent = typeof Node | ((props: any) => Node)

type PropsOf<T> = T extends (props: infer P) => Node
  ? P
  : T extends new (props: infer P) => Node
    ? Omit<P, 'children'>
    : never

type ReturnTypeOf<T> = T extends (props: any) => infer R
  ? R
  : T extends new (props: any) => infer R
    ? R
    : never

type Children = Node | Node[]

type WithChildren<T> = T & { children?: Children }

export function jsx<T extends TinyComponent>(
  type: T,
  props: WithChildren<PropsOf<T>>,
): ReturnTypeOf<T> {
  const { children } = props

  const safeChildren = (children ? [children].flat(Infinity) : []) as Node[]

  let node: ReturnTypeOf<T>

  startHooks()

  if (
    typeof type === 'function' &&
    ('nodeName' in type ||
      type.prototype instanceof Node ||
      type.prototype === Node.prototype)
  ) {
    const Nd = type as typeof Node
    node = new Nd({
      ...props,
      children: safeChildren,
    }) as ReturnTypeOf<T>
  } else {
    node = (type as (props: any) => Node)({
      ...props,
      children: safeChildren,
    }) as ReturnTypeOf<T>
  }

  finishHooks(node)

  return node
}

export const jsxs = jsx
export const Fragment = (props: NodeOptions) => jsx(Node, props)

type TinyElement<T extends Node = Node> = T

declare global {
  namespace JSX {
    type Element = TinyElement
  }
}
