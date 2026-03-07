import { getTexture, type Texture } from '../assets/texture.js'
import type { Vector2 } from '../math/vector2.js'
import { Node, type NodeOptions } from './node.js'

export interface SpriteOptions extends NodeOptions {
  /**
   * The **`textureId`** property of `Sprite` represents the sprite's texture.
   * If **`textureId`** is not in the textures loaded then thow an error.
   *
   * @example
   * ```jsx
   *
   * await loadTexture('ball', 'assets/ball.png')
   *
   * function Ball() {
   *   useStart((node) => {
   *     const container = node.getChild('container')
   *     // ...
   *   })
   *
   *   return (
   *     <sprite textureId='ball' />
   *   )
   * }
   * ```
   */
  textureId?: string
  /**
   * The **`margin`** property of `Sprite` represents the sprite's texture offset.
   *
   * @example
   * ```jsx
   *
   * await loadTexture('idle', 'assets/idle.png')
   *
   * function Player() {
   *   return (
   *     <sprite textureId='idle' margin={new Vector(16, 0)} />
   *   )
   * }
   * ```
   */
  margin?: Vector2
  /**
   * The **`size`** property of `Sprite` represents the sprite's size.
   *
   * @example
   * ```jsx
   *
   * await loadTexture('idle', 'assets/idle.png')
   *
   * function Player() {
   *   return (
   *     <sprite
   *       textureId='idle'
   *       margin={new Vector(16, 0)}
   *       size={new Vector(16, 16)}
   *     />
   *   )
   * }
   * ```
   */
  size?: Vector2
}

/** Default **`id`** for `Sprite` and it is used for jsx tags */
export const spriteNodeName = 'sprite'

export class Sprite extends Node {
  #textureId?: string | undefined
  #texture?: Texture | undefined
  /**
   * The **`margin`** property of `Sprite` represents the sprite's texture offset.
   *
   * @example
   * ```jsx
   *
   * await loadTexture('idle', 'assets/idle.png')
   *
   * function Ball() {
   *   useStart((node) => {
   *     const container = node.getChild('container')
   *     // ...
   *   })
   *
   *   return (
   *     <sprite textureId='idle' margin={new Vector(16, 0)} />
   *   )
   * }
   * ```
   */
  margin?: Vector2 | undefined
  /**
   * The **`size`** property of `Sprite` represents the sprite's size.
   *
   * @example
   * ```jsx
   *
   * await loadTexture('idle', 'assets/idle.png')
   *
   * function Player() {
   *   return (
   *     <sprite
   *       textureId='idle'
   *       margin={new Vector(16, 0)}
   *       size={new Vector(16, 16)}
   *     />
   *   )
   * }
   * ```
   */
  size?: Vector2 | undefined

  /**
   * The **`textureId`** property of `Sprite` represents the sprite's texture.
   * If **`textureId`** is not in the textures loaded then thow an error.
   *
   * @example
   * ```jsx
   *
   * await loadTexture('ball', 'assets/ball.png')
   *
   * function Ball() {
   *   useStart((node) => {
   *     const container = node.getChild('container')
   *     // ...
   *   })
   *
   *   return (
   *     <sprite textureId='ball' />
   *   )
   * }
   * ```
   */
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

  /**
   * The **`getTexture`** method returns the current texture.
   */
  getTexture() {
    return this.#texture
  }

  constructor(options: SpriteOptions) {
    super({ ...options, id: options.id ?? spriteNodeName })

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
