import { Game, Scene } from '../canvas-engine/index.js'
import { Peashooter } from './plants/peashooter.js'

const canvas = document.querySelector('canvas')!
const ctx = canvas.getContext('2d')!

Game.setup({
  canvas,
  ctx,
})

const mainScene = new Scene(() => Peashooter())

Game.sceneManager.addScene('main', mainScene)
Game.sceneManager.setScene('main')

Game.play()
