import { loadTexture } from '../../canvas-engine/load/textures.js'
import { Sprite, useNode } from '../../canvas-engine/nodes/index.js'

await loadTexture(
  'peashooter.idle',
  'assets/sprites/plants/peashooter/idle.png',
)
await loadTexture(
  'peashooter.shoot',
  'assets/sprites/plants/peashooter/shoot.png',
)

export function Peashooter() {
  const { node, onStart } = useNode<Sprite>()

  onStart((node) => {
    console.log(node.id)
  })

  return node(new Sprite({ textureId: 'peashooter.idle' }))
}
