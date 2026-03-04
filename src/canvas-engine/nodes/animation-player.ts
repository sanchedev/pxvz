import { Event } from '../lib/event.js'
import { Node, type NodeOptions } from './node.js'

export interface AnimationPlayerOptions extends NodeOptions {}

export class AnimationPlayer extends Node {
  nodeName = 'animation-player'

  #animations = new Map<string, Animation>()
  #currentAnim: string | null = null
  #index = 0

  get currentAnim() {
    return this.#currentAnim
  }

  constructor(options: AnimationPlayerOptions) {
    super(options)

    this.id = options.id ?? this.nodeName
  }

  // Events
  animationChanged = new Event<[newAnim: string, oldAnim: string | null]>()
  animationStopped = new Event<[anim: string]>()
  animationIndexChanged = new Event<[index: number]>()
  animationEnded = new Event<[anim: string]>()

  add(animName: string, animation: Animation) {
    this.#animations.set(animName, animation)
    return this
  }

  play(animName: string, index?: number) {
    this.animationChanged.emit(animName, this.#currentAnim)
    if (this.#currentAnim != null) this.stop()
    this.#index = index ?? 0
    this.#currentAnim = animName
    this.animationIndexChanged.emit(index ?? 0)
  }

  stop() {
    if (this.#currentAnim == null) return
    this.animationStopped.emit(this.#currentAnim)
    this.#index = 0
    this.#currentAnim = null
  }

  #updateAnim(delta: number): void {
    if (this.#currentAnim == null) return

    const anim = this.#animations.get(this.#currentAnim)

    if (anim == null) return

    if (this.#index >= anim.keyframes.length) {
      if (!anim.loop) {
        const animName = this.#currentAnim
        this.stop()
        this.animationEnded.emit(animName)

        return
      }

      this.animationIndexChanged.emit(0)
      this.#index = 0
    }

    const i = Math.floor(this.#index)

    const kf = anim.keyframes[i]

    if (kf == null) throw new Error(`The keyframe index ${i} does not exist.`)

    kf(this.#index / anim.fps)

    this.#index += delta * anim.fps

    if (this.#index < anim.keyframes.length && i !== Math.floor(this.#index)) {
      this.animationIndexChanged.emit(Math.floor(this.#index))
    }
  }

  update(delta: number): void {
    this.#updateAnim(delta)
    super.update(delta)
  }
}

interface Animation {
  fps: number
  keyframes: AnimationKeyframe[]
  loop?: boolean | undefined
}

type AnimationKeyframe = (time: number) => void

export function kfFromProp<T extends Node, K extends keyof T>(
  node: T,
  property: K,
  value: T[K],
): AnimationKeyframe {
  return () => {
    node[property] = value
  }
}

export function multiKF(kfs: AnimationKeyframe[]): AnimationKeyframe {
  return (time) => kfs.forEach((kf) => kf(time))
}
