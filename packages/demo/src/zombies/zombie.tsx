import { loadTexture, useEvent, useNode, Vector2 } from 'tiny-engine'

await loadTexture('zombie.walk', 'assets/sprites/zombies/zombie/walk.png')

export function Zombie() {
  const sprite = useNode('sprite')

  useEvent(
    (delta) => {
      sprite.position.x -= delta * 10
    },
    () => sprite.updated,
  )

  return (
    <sprite
      use={sprite}
      textureId='zombie.walk'
      size={new Vector2(16, 16)}
      position={new Vector2(128, 0)}>
      <collider size={new Vector2(16, 16)} layer={['zombie']} mesh={[]} />
    </sprite>
  )
}
