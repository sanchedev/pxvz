import { loadTexture, kfFromSpriteSheet, Vector2, useNode } from 'tiny-engine'

import { Pea } from '../projectiles/pea.js'

await loadTexture(
  'peashooter.idle',
  'assets/sprites/plants/peashooter/idle.png',
)
await loadTexture(
  'peashooter.shoot',
  'assets/sprites/plants/peashooter/shoot.png',
)

export function Peashooter() {
  const usedSprite = useNode<'sprite'>()
  const usedAnimPlayer = useNode<'animation-player'>()
  const usedProjectilesContainer = useNode({
    nodeType: 'node',
    path: '/projectiles',
  })

  const handleStart = () => {
    const sprite = usedSprite.node
    const animPlayer = usedAnimPlayer.node
    const projectilesContainer = usedProjectilesContainer.node

    if (animPlayer == null || sprite == null || projectilesContainer == null)
      return

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

    animPlayer.animationEnded.on((anim) => {
      if (anim === 'idle') {
        animPlayer.play('shoot')
      } else {
        animPlayer.play('idle')
      }
    })

    animPlayer.animationIndexChanged.on((index) => {
      if (animPlayer.currentAnim === 'shoot' && index === 2) {
        projectilesContainer.addChild(
          <Pea position={sprite.globalPosition.toAdded(new Vector2(10, 8))} />,
        )
      }
    })

    animPlayer.play('idle')
  }

  return (
    <sprite
      textureId='peashooter.idle'
      size={new Vector2(16, 16)}
      use={usedSprite}
      onStart={handleStart}>
      <animation-player use={usedAnimPlayer} />
    </sprite>
  )
}
