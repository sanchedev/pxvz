import { Node, type NodeOptions } from './nodes/index.js'

type TinyComponent = typeof Node | ((props: any) => Node)

type PropsOf<T> = T extends (props: infer P) => Node
  ? P
  : T extends new (props: infer P) => Node
    ? P
    : never

type WithChildren<P> = P & {
  children?: Node | Node[]
}

export function jsx<T extends TinyComponent>(
  type: T,
  props: WithChildren<PropsOf<T>>,
): Node {
  const { children } = props

  const safeChildren = children?.flat(Infinity)

  if (typeof type === 'function' && type.prototype instanceof Node) {
    return new (type as typeof Node)({ ...props, children: safeChildren })
  }

  return (type as (props: any) => Node)({ ...props, children: safeChildren })
}

export const jsxs = jsx
export const Fragment = (props: NodeOptions) => new Node(props)

declare global {
  namespace JSX {
    interface Element extends Node {}
  }
}
