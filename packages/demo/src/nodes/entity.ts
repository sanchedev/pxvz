import { Event, Node, type NodeOptions } from 'tiny-engine'

export interface EntityOptions extends NodeOptions {
  health: number
}

export class Entity extends Node {
  health: number

  constructor(options: EntityOptions) {
    super(options)
    this.health = options.health
  }

  damage(count: number) {
    this.health -= count

    if (this.health <= 0) {
      this.#die()
    }
  }

  #die() {
    console.log('die')
    this.destroy()
    console.log(this)
  }

  // Events
  dead = new Event('die', () => {})

  destroy(): void {
    super.destroy()
    console.log('destroyed')
  }
}
