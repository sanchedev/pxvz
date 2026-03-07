import { Node, nodeName, type NodeOptions } from '../nodes/node.js'
import { Sprite, spriteNodeName } from '../nodes/sprite.js'
import {
  AnimationPlayer,
  animationPlayerNodeName,
} from '../nodes/animation-player.js'
import { View, viewNodeName } from '../nodes/ui/view.js'
import { Text, textNodeName } from '../nodes/ui/text.js'
import type { NodesOptions } from '../nodes/types.js'
import type { UsedNode } from '../hooks/node.js'

export interface NodeElement<T extends Node = Node> {
  use?: UsedNode<T>
  onStart?: Parameters<Node['started']['on']>[0]
  onDraw?: Parameters<Node['drawed']['on']>[0]
  onUpdate?: Parameters<Node['updated']['on']>[0]
  onDestroy?: Parameters<Node['destroyed']['on']>[0]
}

export interface AnimationPlayerElement<
  T extends AnimationPlayer = AnimationPlayer,
> extends NodeElement<T> {
  onAnimationChange?: Parameters<AnimationPlayer['animationChanged']['on']>[0]
  onAnimationEnd?: Parameters<AnimationPlayer['animationEnded']['on']>[0]
  onAnimationIndexChange?: Parameters<
    AnimationPlayer['animationIndexChanged']['on']
  >[0]
  onAnimationStop?: Parameters<AnimationPlayer['animationStopped']['on']>[0]
}

export const NodeElements = {
  [nodeName]: (node: Node, opts: NodeElement<Node>) => {
    return addNodeElement(node, opts)
  },
  [spriteNodeName]: (node: Sprite, opts: NodeElement<Sprite>) => {
    return addNodeElement(node, opts)
  },
  [animationPlayerNodeName]: (
    node: AnimationPlayer,
    opts: AnimationPlayerElement<AnimationPlayer>,
  ) => {
    return addAnimationPlayerElement(addNodeElement(node, opts), opts)
  },
  // ui
  [viewNodeName]: (node: View, opts: NodeElement<View>) => {
    return addNodeElement(node, opts)
  },
  [textNodeName]: (node: Text, opts: NodeElement<Text>) => {
    return addNodeElement(node, opts)
  },
}

function addNodeElement<T extends Node>(node: T, opts: NodeElement): T {
  if (opts.onStart) node.started.on(opts.onStart)
  if (opts.onDraw) node.drawed.on(opts.onDraw)
  if (opts.onUpdate) node.updated.on(opts.onUpdate)
  if (opts.onDestroy) node.destroyed.on(opts.onDestroy)
  if (opts.use) opts.use.node = node
  return node
}

function addAnimationPlayerElement<T extends AnimationPlayer>(
  node: T,
  opts: AnimationPlayerElement,
): T {
  if (opts.onAnimationChange) node.animationChanged.on(opts.onAnimationChange)
  if (opts.onAnimationEnd) node.animationEnded.on(opts.onAnimationEnd)
  if (opts.onAnimationIndexChange)
    node.animationIndexChanged.on(opts.onAnimationIndexChange)
  if (opts.onAnimationStop) node.animationStopped.on(opts.onAnimationStop)
  return node
}

export type NodeIntrinsicElements = {
  [P in keyof typeof NodeElements]: WithChildren<NodesOptions[P]> &
    Parameters<(typeof NodeElements)[P]>[1]
}

type Children = undefined | Node | Node[]

type WithChildren<T extends NodeOptions> = Omit<T, 'children'> & {
  children?: Children
}
