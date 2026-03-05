import type { Node } from '../nodes/node.js'
import { Event } from '../events/event.js'

type FunEv<T extends Event<any[]>> = Parameters<T['on']>[0]
type ParEv<T extends Event<any[]>> = Parameters<FunEv<T>>

export type NodEv<T extends Node, K extends Event<any[]>> = (
  node: T,
  ...args: ParEv<K>
) => void
