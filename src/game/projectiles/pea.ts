import {
  GameConfig,
  loadTexture,
  addUpdate,
  useAdd,
  Sprite,
} from '../../canvas-engine/index.js'

await loadTexture('pea', 'assets/sprites/projectiles/pea.png')

const PEA_SPEED = 40

export function Pea() {
  const add = useAdd<Sprite>()

  addUpdate((node, delta) => {
    if (node.globalPosition.x <= GameConfig.width) {
      node.position.x += delta * PEA_SPEED
    } else {
      node.destroy()
    }
  }, add.adds)

  return add.toNode(
    new Sprite({
      textureId: 'pea',
    }),
  )
}
