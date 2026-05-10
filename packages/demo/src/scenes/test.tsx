import { loadTexture, Vector2 } from 'tiny-engine'
import { Board } from '../components/board/board.js'

await loadTexture('bgs.day.4', '/assets/sprites/ui/bgs/day/bg-4.png')

export default function Test() {
  return (
    <node>
      <sprite textureId='bgs.day.4' displaySize={new Vector2(288, 112)} />
      <Board
        position={new Vector2(40, 24)}
        cellSize={new Vector2(64, 64)}
        cellsCount={new Vector2(9, 5)}
      />
    </node>
  )
}
