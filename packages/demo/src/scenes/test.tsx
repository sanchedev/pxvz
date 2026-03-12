import { loadTexture } from 'tiny-engine'
import { Board } from '../components/board.js'

await loadTexture('bg-day', '/assets/sprites/backgrounds/day.png')

export default function Test() {
  return (
    <sprite textureId='bg-day'>
      <Board />
    </sprite>
  )
}
