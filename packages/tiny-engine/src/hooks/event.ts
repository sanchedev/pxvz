import { InvalidEventHookResultError } from '../errors/hook.js'
import { Event } from '../events/event.js'
import { pushEffect } from './context.js'

/**
 * The **`useEvent`** hook allows you to subscribe to an event. It takes two parameters: the first is the callback function that will be called when the event is emitted, and the second is a function that returns the event instance to subscribe to.
 *
 * @example
 * ```tsx
 * const sprite = useNode<'sprite'>()
 *
 * useEvent(() => {
 *  // do something when the sprite starts
 * }, () => sprite.started)
 * ```
 *
 * @param fn The callback function that will be called when the event is emitted.
 * @param getEvent A function that returns the event instance to subscribe to.
 */
export function useEvent<T extends Event<any[], string>>(
  fn: T['exampleFun'],
  getEvent: () => T,
) {
  pushEffect('useEvent', () => {
    const ev = getEvent()
    if (!(ev instanceof Event)) throw new InvalidEventHookResultError()
    ev.on(fn)
  })
}
