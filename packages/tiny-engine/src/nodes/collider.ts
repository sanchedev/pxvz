import { GameConfig } from '../core/game-config.js'
import { Event } from '../events/event.js'
import type { Vector2 } from '../math/vector2.js'
import { Node, type NodeOptions } from './node.js'
import { Nodes } from './registry.js'

/** Default **`id`** for `Node` and it is used for jsx tags */
export const colliderNodeName = 'collider'

export interface ColliderOptions extends NodeOptions {
  size: Vector2
  layer: string[]
  mesh: string[]
}

export class Collider extends Node {
  size: Vector2
  layer: string[] = []
  mesh: string[] = []

  constructor(options: ColliderOptions) {
    super(options)

    this.size = options.size
    this.layer = options.layer
    this.mesh = options.mesh
  }

  #colliders = new Set<Collider>()

  // Events
  colliderEntered = new Event('colliderEnter', (collider: Collider) => {})
  collided = new Event('collide', (collider: Collider) => {})
  colliderExited = new Event('colliderExit', (collider: Collider) => {})

  start(): void {
    colliders.add(this)
    super.start()
  }

  draw(delta: number): void {
    GameConfig.ctx.fillStyle = '#85b2e25c'
    GameConfig.ctx.strokeStyle = '#3f73abb4'
    GameConfig.ctx.lineWidth = 1
    GameConfig.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
    )
    GameConfig.ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
    )

    super.draw(delta)
  }

  update(delta: number): void {
    for (const collider of colliders) {
      if (collider === this) continue
      if (this.mesh.every((m) => !collider.layer.includes(m))) continue

      const from1 = this.globalPosition
      const to1 = from1.toAdded(this.size)
      const from2 = collider.globalPosition
      const to2 = from2.toAdded(collider.size)

      if (detectCollision(from1, to1, from2, to2)) {
        if (!this.#colliders.has(collider)) {
          this.#colliders.add(collider)
          collider.destroyed.on(() => {
            if (this.#colliders.has(collider)) {
              this.#colliders.delete(collider)
            }
          })
          this.colliderEntered.emit(collider)
        }
        this.collided.emit(collider)
      } else {
        if (this.#colliders.has(collider)) {
          this.colliderExited.emit(collider)
        }
      }
    }
    super.update(delta)
  }

  destroy(): void {
    colliders.delete(this)
    super.destroy()
  }
}

Nodes.collider = Collider

const colliders = new Set<Collider>()

function detectCollision(
  from1: Vector2,
  to1: Vector2,
  from2: Vector2,
  to2: Vector2,
) {
  return (
    from1.x < to2.x && to1.x > from2.x && from1.y < to2.y && to1.y > from2.y
  )
}
