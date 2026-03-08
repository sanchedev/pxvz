import { Signal } from '../utils/signal.js'

export function useSignal<T>(initialValue: T) {
  return new Signal(initialValue)
}
