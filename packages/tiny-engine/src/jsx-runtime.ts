import { finishHooks, startHooks } from './hooks/context.js'
import {
  type Elements,
  Nodes,
  type NodeToOptions,
  type TypeElements,
} from './nodes/types.js'
import { Node, type NodeOptions } from './nodes/index.js'

export type TinyComponent =
  | keyof JSX.IntrinsicElements
  | typeof Node
  | ((props: any) => Node)

type PropsOf<T> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : T extends (props: infer P) => Node
    ? P
    : T extends new (props: infer P) => Node
      ? Omit<P, 'children'>
      : never

type ReturnTypeOf<T> = T extends keyof JSX.IntrinsicElements
  ? (typeof Nodes)[T]['prototype']
  : T extends (props: any) => infer R
    ? R
    : T extends new (props: any) => infer R
      ? R
      : never

export function jsx<T extends TinyComponent>(
  type: T,
  props: PropsOf<T>,
): ReturnTypeOf<T> {
  const { children } = props

  const safeChildren = (children ? [children].flat(Infinity) : []) as Node[]

  let node: ReturnTypeOf<T>

  startHooks()

  if (typeof type === 'string') {
    node = new (Nodes[type as keyof JSX.IntrinsicElements] as typeof Node)({
      ...props,
      children: safeChildren,
    } as NodeToOptions<typeof Node>) as ReturnTypeOf<T>
  } else if (
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

declare global {
  namespace JSX {
    type Element = Node

    interface IntrinsicElements extends Elements {}
    interface NodeTypes extends TypeElements {}
  }
}
