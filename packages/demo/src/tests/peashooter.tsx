import { Game, Scene } from 'tiny-engine'

const root = document.querySelector<HTMLElement>('#root')!

Game.setup({
  width: 160,
  height: 90,
  root,
})

const mainScene = new Scene(
  async () => (await import('../plants/peashooter.js')).Peashooter,
)

Game.sceneManager.addScene('main', mainScene)
Game.sceneManager.setScene('main')

Game.play()
