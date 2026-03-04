import { Game, Scene } from '../canvas-engine/index.js'
import { loadTexture } from '../canvas-engine/load/textures.js'
import { Sprite } from '../canvas-engine/nodes/sprite.js'

const canvas = document.querySelector('canvas')!
const ctx = canvas.getContext('2d')!

await loadTexture('icon', 'assets/icon.png')

Game.setup({
  canvas,
  ctx,
})

const mainScene = new Scene(
  () =>
    new Sprite({
      textureId: 'icon',
    }),
)

Game.sceneManager.addScene('main', mainScene)
Game.sceneManager.setScene('main')

Game.play()
