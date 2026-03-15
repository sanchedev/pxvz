import { Entity, type EntityOptions } from './entity'

export interface ZombieOptions extends EntityOptions {}

export class Zombie extends Entity {
  constructor(options: ZombieOptions) {
    super(options)
  }
}
