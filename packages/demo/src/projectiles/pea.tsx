import {
  GameConfig,
  loadTexture,
  useStart,
  useUpdate,
  Vector2,
} from 'tiny-engine'

await loadTexture('pea', 'assets/sprites/projectiles/pea.png')

const PEA_SPEED = 40

interface PeaProps {
  position: Vector2
}

export function Pea({ position }: PeaProps) {
  useStart<'sprite'>((node) => {
    console.log(node)
  })
  useUpdate<'sprite'>((node, delta: number) => {
    if (node.globalPosition.x <= GameConfig.width) {
      node.position.x += delta * PEA_SPEED
    } else {
      node.destroy()
    }
  })

  return <sprite textureId='pea' position={position} />
}
