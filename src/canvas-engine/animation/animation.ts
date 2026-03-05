import { getTexture } from '../assets/texture.js'
import { Vector2 } from '../math/vector2.js'
import type { AnimationKeyframe } from '../nodes/animation-player.js'
import type { Node } from '../nodes/node.js'
import type { Sprite } from '../nodes/sprite.js'

export function kfFromProp<T extends Node, K extends keyof T>(
  node: T,
  property: K,
  value: T[K],
): AnimationKeyframe {
  return () => {
    node[property] = value
  }
}

export function multiKF(kfs: AnimationKeyframe[]): AnimationKeyframe {
  return (time) => kfs.forEach((kf) => kf(time))
}

export function kfSpriteSheet(
  sprite: Sprite,
  textureId: string | null,
  spritesCountX: number = 1,
  spritesCounty: number = 1,
): AnimationKeyframe[] {
  const texture = textureId ? getTexture(textureId) : sprite.getTexture()

  const spriteWidth = texture.width
  const spriteHeight = texture.height

  const sizeX = spriteWidth / spritesCountX
  const sizeY = spriteHeight / spritesCounty

  return [
    multiKF([
      ...(textureId ? [kfFromProp(sprite, 'textureId', textureId)] : []),
      kfFromProp(sprite, 'margin', new Vector2(0, 0)),
    ]),
    ...Array.from({ length: spritesCountX * spritesCounty - 1 }, (_, i) => {
      const x = (i + 1) % spritesCountX
      const y = Math.floor((i + 1) / spritesCountX)

      return kfFromProp(sprite, 'margin', new Vector2(x * sizeX, y * sizeY))
    }),
  ]
}
