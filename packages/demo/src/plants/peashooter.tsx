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
  const spriteUsed = useNode<'sprite'>()
  const animPlayerUsed = useNode<'animation-player'>()
  const projectilesContainerUsed = useNode({
    nodeType: 'node',
    path: '/projectiles',
  })

  const handleStart = () => {
    const sprite = spriteUsed.get()
    const animPlayer = animPlayerUsed.get()

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
  }

  const handleAnimationEnd = (anim: string) => {
    const animPlayer = animPlayerUsed.get()

    if (anim === 'idle') {
      animPlayer.play('shoot')
    } else {
      animPlayer.play('idle')
    }
  }

  const handleAnimationIndexChange = (index: number) => {
    const sprite = spriteUsed.get()
    const animPlayer = animPlayerUsed.get()
    const projectilesContainer = projectilesContainerUsed.get()

    if (animPlayer.currentAnim === 'shoot' && index === 2) {
      projectilesContainer.addChild(
        <Pea position={sprite.globalPosition.toAdded(new Vector2(10, 8))} />,
      )
    }
  }

  return (
    <sprite
      use={spriteUsed}
      textureId='peashooter.idle'
      size={new Vector2(16, 16)}
      onStart={handleStart}>
      <animation-player
        use={animPlayerUsed}
        onAnimationEnd={handleAnimationEnd}
        onAnimationIndexChange={handleAnimationIndexChange}
      />
    </sprite>
  )
}
