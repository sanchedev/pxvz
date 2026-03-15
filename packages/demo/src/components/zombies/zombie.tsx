import { loadTexture, Vector2 } from 'tiny-engine'
import { useContext, useSignal } from 'tiny-engine/hooks'
import { BoardCtx } from '../../contexts/board'
import { RowCtx } from '../../contexts/row'

await loadTexture('zombie.walk', 'assets/sprites/zombies/zombie/walk.png')

export function Zombie() {
  const { cellSize, cellsCount } = useContext(BoardCtx)
  const { zombiesLayer } = useContext(RowCtx)

  const zombiePos = useSignal(new Vector2(cellSize.x * cellsCount.x, 0))

  const handleUpdate = (delta: number) => {
    zombiePos.value.x -= delta * 5
  }

  return (
    <zombie health={181} position={zombiePos}>
      <collider size={new Vector2(16, 16)} layer={[zombiesLayer]} mesh={[]} />
      <sprite
        textureId='zombie.walk'
        size={new Vector2(16, 16)}
        onUpdate={handleUpdate}
      />
    </zombie>
  )
}
