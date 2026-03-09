import { Game, Scene } from 'tiny-engine'

Game.sceneManager.addScene(
  'test',
  new Scene(async () => (await import('../envs/one.js')).OneEnv),
)
