import { Game, Scene } from 'tiny-engine'
import { Peashooter } from '../plants/peashooter'

Game.sceneManager.addScene(
  'test',
  new Scene(() => (
    <node>
      <node id='projectiles' />
      <Peashooter />
    </node>
  )),
)
