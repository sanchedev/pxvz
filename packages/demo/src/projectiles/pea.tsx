import { GameConfig, loadTexture, useNode, Vector2 } from 'tiny-engine'

await loadTexture('pea', 'assets/sprites/projectiles/pea.png')

const PEA_SPEED = 40

interface PeaProps {
  position: Vector2
}

export function Pea({ position }: PeaProps) {
  const pea = useNode<'sprite'>()

  const handleUpdate = (delta: number) => {
    if (pea.globalPosition.x <= GameConfig.width) {
      pea.position.x += delta * PEA_SPEED
    } else {
      pea.destroy()
    }
  }

  return (
    <sprite
      use={pea}
      textureId='pea'
      position={position}
      onUpdate={handleUpdate}
    />
  )
}
