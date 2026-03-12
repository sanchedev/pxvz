import {
  loadTexture,
  kfFromSpriteSheet,
  Vector2,
  GameConfig,
} from 'tiny-engine'
import { useContext, useEvent, useNode } from 'tiny-engine/hooks'

import { Pea } from '../projectiles/pea.js'
import { RowCtx } from '../../contexts/row.js'
import type { PlantProps } from '../../types.js'

await loadTexture(
  'peashooter.idle',
  'assets/sprites/plants/peashooter/idle.png',
)
await loadTexture(
  'peashooter.shoot',
  'assets/sprites/plants/peashooter/shoot.png',
)

interface PeashooterProps extends PlantProps {}

export function Peashooter({ position }: PeashooterProps) {
  const { animPlayer, sprite, rayCast } = usePeashooter(position)

  return (
    <entity position={position}>
      <sprite
        use={sprite}
        textureId='peashooter.idle'
        size={new Vector2(16, 16)}>
        <ray-cast
          use={rayCast}
          position={new Vector2(8, 10)}
          length={0}
          mesh={['zombies']}
        />
        <animation-player use={animPlayer} />
      </sprite>
    </entity>
  )
}

function usePeashooter(position: Vector2) {
  const sprite = useNode('sprite')
  const animPlayer = useNode('animation-player')
  const rayCast = useNode('ray-cast')
  const { spawnProjectile } = useContext(RowCtx)

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
      rayCast.length = GameConfig.width - rayCast.globalPosition.x
    },
    () => sprite.started,
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
        spawnProjectile(<Pea position={position.toAdded(new Vector2(10, 8))} />)
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

  return { sprite, animPlayer, rayCast }
}
