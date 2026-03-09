import { Peashooter } from '../plants/peashooter.js'
import { Zombie } from '../zombies/zombie.js'

export function OneEnv() {
  return (
    <node>
      <node id='projectiles' />
      <Peashooter />
      <Zombie />
    </node>
  )
}
