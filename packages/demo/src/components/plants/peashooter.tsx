import { kfFromSpriteSheet, loadTexture, Vector2 } from 'tiny-engine'
import type { PlantProps } from '../types.js'
import { useEvent, useNode } from 'tiny-engine/hooks'

await loadTexture(
  'peashooter.idle',
  '/assets/sprites/plants/peashooter/idle.png',
)
await loadTexture(
  'peashooter.shoot',
  '/assets/sprites/plants/peashooter/shoot.png',
)

interface PeashooterProps extends PlantProps {}

export function Peashooter({ position }: PeashooterProps) {
  const sprite = useNode('sprite')
  const animPlayer = useNode('animation-player')

  let isZombieDetected = false

  // when sprite started
  useEvent(
    () => {
      animPlayer.add('idle', {
        keyframes: kfFromSpriteSheet(sprite, 'peashooter.idle', 4),
        fps: 8 / 3,
      })
      animPlayer.add('shoot', {
        keyframes: kfFromSpriteSheet(sprite, 'peashooter.shoot', 4),
        fps: 8 / 3,
      })

      animPlayer.play('idle')
    },
    () => sprite.started,
  )
  // when animation ended
  useEvent(
    () => {
      if (isZombieDetected) {
        animPlayer.play('shoot')
      } else {
        animPlayer.play('idle')
      }
    },
    () => animPlayer.animationEnded,
  )

  return (
    <node position={position}>
      <sprite
        use={sprite}
        textureId='peashooter.idle'
        sourceSize={new Vector2(16, 16)}>
        <animation-player use={animPlayer} />
      </sprite>
    </node>
  )
}
