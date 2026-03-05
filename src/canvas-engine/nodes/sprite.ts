import { getTexture, type Texture } from '../assets/texture.js'
import type { Vector2 } from '../math/vector2.js'
import { Node, type NodeOptions } from './node.js'

export interface SpriteOptions extends NodeOptions {
  textureId?: string
  margin?: Vector2
  size?: Vector2
}

export class Sprite extends Node {
  nodeName = 'sprite'

  #textureId?: string | undefined
  #texture?: Texture | undefined
  margin?: Vector2 | undefined
  size?: Vector2 | undefined

  get textureId() {
    return this.#textureId
  }
  set textureId(value) {
    if (this.textureId === value) return
    if (value == null) {
      this.#textureId = undefined
      this.#texture = undefined
      return
    }

    this.#textureId = value
    if (this.isStarted) {
      this.#texture = getTexture(value)
    }
  }

  getTexture() {
    return this.#texture
  }

  constructor(options: SpriteOptions) {
    super(options)

    this.id = options.id ?? this.nodeName

    this.margin = options.margin
    this.size = options.size
    this.textureId = options.textureId
  }

  start(): void {
    if (this.textureId) {
      this.#texture = getTexture(this.textureId)
    }
    super.start()
  }

  #drawTexture() {
    if (this.#texture == null) return
    this.#texture.draw({
      position: this.position,
      margin: this.margin,
      size: this.size,
    })
  }

  draw(delta: number): void {
    this.#drawTexture()
    super.draw(delta)
  }
}
