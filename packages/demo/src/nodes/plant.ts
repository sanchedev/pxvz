import { Entity, type EntityOptions } from './entity'

export interface PlantOptions extends EntityOptions {}

export class Plant extends Entity {
  constructor(options: PlantOptions) {
    super(options)
  }
}
