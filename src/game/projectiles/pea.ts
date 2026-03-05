import {
  GameConfig,
  loadTexture,
  addUpdate,
  useAdd,
  Sprite,
  addStart,
  useLoad,
} from '../../canvas-engine/index.js'

function load() {
  return [loadTexture('pea', 'assets/sprites/projectiles/pea.png')]
}

const PEA_SPEED = 40

export function Pea() {
  useLoad(load)

  const add = useAdd<Sprite>()

  addStart((node) => {
    console.log(node)
  }, add.adds)
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
