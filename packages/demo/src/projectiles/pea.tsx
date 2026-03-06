import {
  GameConfig,
  loadTexture,
  Sprite,
  useStart,
  useUpdate,
} from 'tiny-engine'

await loadTexture('pea', 'assets/sprites/projectiles/pea.png')

const PEA_SPEED = 40

export function Pea() {
  useStart((node: Sprite) => {
    console.log(node)
  })
  useUpdate((node: Sprite, delta: number) => {
    if (node.globalPosition.x <= GameConfig.width) {
      node.position.x += delta * PEA_SPEED
    } else {
      node.destroy()
    }
  })

  return <Sprite textureId='pea' />
}
