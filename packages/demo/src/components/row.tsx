import { Vector2 } from 'tiny-engine'
import { RowCtx } from '../contexts/row'
import { Peashooter } from './plants/peashooter'
import { useNode, useSpawn } from 'tiny-engine/hooks'

interface RowProps {
  row: number
}

export function Row({ row }: RowProps) {
  const projectiles = useNode('node')
  const spawnProjectile = useSpawn(projectiles)
  const zombies = useNode('node')
  const spawnZombie = useSpawn(zombies)
  const plants = useNode('node')
  const spawnPlant = useSpawn(plants)

  return (
    <RowCtx.Provider
      value={{
        spawnPlant,
        spawnProjectile,
        spawnZombie,
      }}>
      <node id={`row-${row}`} position={new Vector2(0, 16 * (row - 1))}>
        <node use={projectiles} id='projectiles' />
        <node use={zombies} id='zombies' />
        <node use={plants} id='plants'>
          <Peashooter position={new Vector2(0, 0)} />
        </node>
      </node>
    </RowCtx.Provider>
  )
}
