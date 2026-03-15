import { registerNode } from 'tiny-engine'
import { Entity } from './entity'
import { Plant } from './plant'
import { Zombie } from './zombie'

declare module 'tiny-engine' {
  interface NodeClasses {
    entity: typeof Entity
    plant: typeof Plant
    zombie: typeof Zombie
  }
}

registerNode('entity', Entity)
registerNode('plant', Plant)
registerNode('zombie', Zombie)
