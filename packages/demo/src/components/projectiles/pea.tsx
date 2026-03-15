import { Collider, GameConfig, loadTexture, Vector2 } from 'tiny-engine'
import { useNode, useSignal, useContext } from 'tiny-engine/hooks'
import { RowCtx } from '../../contexts/row'
import type { ProjectileProps } from '../../types'
import { Zombie } from '../../nodes/zombie'

await loadTexture('pea', 'assets/sprites/projectiles/pea.png')

const PEA_SPEED = 40

interface PeaProps extends ProjectileProps {
  position: Vector2
}

export function Pea({ position }: PeaProps) {
  const pea = useNode('sprite')
  const peaPos = useSignal(position)

  const { projectilesLayer, zombiesLayer } = useContext(RowCtx)

  const handleUpdate = (delta: number) => {
    if (pea.globalPosition.x <= GameConfig.width) {
      peaPos.value.x += delta * PEA_SPEED
    } else {
      pea.destroy()
    }
  }

  const handleColliderEnter = (collider: Collider) => {
    const zombie = collider.parent

    if (zombie == null) return
    if (!(zombie instanceof Zombie)) return

    zombie.damage(10)
    pea.destroy()
  }

  return (
    <sprite use={pea} textureId='pea' position={peaPos} onUpdate={handleUpdate}>
      <collider
        size={new Vector2(4, 4)}
        layer={[projectilesLayer]}
        mesh={[zombiesLayer]}
        onColliderEnter={handleColliderEnter}
      />
    </sprite>
  )
}
