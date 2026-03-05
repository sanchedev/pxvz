import { Scene } from '../core/scene.js'

export function useLoad(loads: () => Promise<void>[]) {
  if (Scene.accLoad == null) {
    throw new Error('useLoad can only be used inside a Scene render function.')
  }
  Scene.accLoad.push(...loads())
}
