import { Vector2 } from 'tiny-engine'
import { RowCtx, RowSpawnersCtx } from '../contexts/row'
import { Peashooter } from './plants/peashooter'
import { useNode, useSpawn } from 'tiny-engine/hooks'
import { Zombie } from './zombies/zombie'

interface RowProps {
  row: number
}

export function Row({ row }: RowProps) {
  return (
    <RowCtx.Provider
      value={{
        projectilesLayer: `projectile-${row}`,
        plantsLayer: `plant-${row}`,
        zombiesLayer: `zombie-${row}`,
      }}>
      <node id={`row-${row}`} position={new Vector2(0, 16 * (row - 1))}>
        <RowSpawner />
      </node>
    </RowCtx.Provider>
  )
}

function RowSpawner() {
  const projectiles = useNode('node')
  const spawnProjectile = useSpawn(projectiles)
  const zombies = useNode('node')
  const spawnZombie = useSpawn(zombies)
  const plants = useNode('node')
  const spawnPlant = useSpawn(plants)

  return (
    <RowSpawnersCtx.Provider
      value={{
        spawnPlant,
        spawnProjectile,
        spawnZombie,
      }}>
      <node use={projectiles} id='projectiles' />
      <node use={zombies} id='zombies'>
        <Zombie />
      </node>
      <node use={plants} id='plants'>
        <Peashooter cellPosition={new Vector2(0, 0)} />
      </node>
    </RowSpawnersCtx.Provider>
  )
}
