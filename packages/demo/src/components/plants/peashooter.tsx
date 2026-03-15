import { loadTexture, kfFromSpriteSheet, Vector2 } from 'tiny-engine'
import { useContext, useEvent, useNode } from 'tiny-engine/hooks'

import { Pea } from '../projectiles/pea.js'
import { RowCtx, RowSpawnersCtx } from '../../contexts/row.js'
import type { PlantProps } from '../../types.js'
import { BoardCtx } from '../../contexts/board.js'

await loadTexture(
  'peashooter.idle',
  'assets/sprites/plants/peashooter/idle.png',
)
await loadTexture(
  'peashooter.shoot',
  'assets/sprites/plants/peashooter/shoot.png',
)

interface PeashooterProps extends PlantProps {}

export function Peashooter({ cellPosition }: PeashooterProps) {
  const { plant, animPlayer, sprite, rayCast } = usePeashooter(cellPosition)
  const { zombiesLayer } = useContext(RowCtx)

  return (
    <plant use={plant} health={30}>
      <sprite
        use={sprite}
        textureId='peashooter.idle'
        size={new Vector2(16, 16)}
      />
      <ray-cast
        use={rayCast}
        position={new Vector2(8, 10)}
        length={0}
        mesh={[zombiesLayer]}
      />
      <animation-player use={animPlayer} />
    </plant>
  )
}

function usePlant(cellPosition: Vector2) {
  const plant = useNode('plant')
  const board = useContext(BoardCtx)

  useEvent(
    () => {
      plant.position = cellPosition.toMultiplied(board.cellSize)
    },
    () => plant.started,
  )

  return { plant }
}

function usePeashooter(cellPosition: Vector2) {
  const { plant } = usePlant(cellPosition)
  const sprite = useNode('sprite')
  const animPlayer = useNode('animation-player')
  const rayCast = useNode('ray-cast')
  const boardContext = useContext(BoardCtx)
  const rowContext = useContext(RowSpawnersCtx)

  let shoot = false

  useEvent(
    () => {
      animPlayer
        .add('idle', {
          fps: 4,
          keyframes: kfFromSpriteSheet(sprite, 'peashooter.idle', 4),
          loop: false,
        })
        .add('shoot', {
          fps: 4,
          keyframes: kfFromSpriteSheet(sprite, 'peashooter.shoot', 4),
          loop: false,
        })

      animPlayer.play('idle')

      rayCast.length =
        (boardContext.cellsCount.x - cellPosition.x) * boardContext.cellSize.x -
        rayCast.position.x
    },
    () => plant.started,
  )

  useEvent(
    (_) => {
      if (shoot) {
        animPlayer.play('shoot')
      } else {
        animPlayer.play('idle')
      }
    },
    () => animPlayer.animationEnded,
  )

  useEvent(
    (index) => {
      if (animPlayer.currentAnim === 'shoot' && index === 2) {
        rowContext.spawnProjectile(
          <Pea
            position={cellPosition.toAdded(new Vector2(10, 8))}
            {...{ boardContext, rowContext }}
          />,
        )
      }
    },
    () => animPlayer.animationIndexChanged,
  )

  useEvent(
    () => {
      shoot = true
    },
    () => rayCast.colliderEntered,
  )
  useEvent(
    () => {
      shoot = false
    },
    () => rayCast.colliderExited,
  )

  return { plant, sprite, animPlayer, rayCast }
}
