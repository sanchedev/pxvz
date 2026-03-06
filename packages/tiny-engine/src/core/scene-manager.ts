import type { Node } from '../nodes/node.js'
import type { Scene } from './scene.js'

export class SceneManager {
  #scenes = new Map<string, Scene>()

  #currentScene: string | null = null

  #currentNode: Node | null = null

  async addScene(name: string, scene: Scene, setit = false) {
    this.#scenes.set(name, scene)
    if (setit) await this.setScene(name)
  }

  async preloadScene(scene: string) {
    if (!this.#scenes.has(scene))
      throw new Error(`Scene ${scene}does not exist.`)

    const node = await this.#scenes.get(scene)!.load()

    const setScene = () => {
      this.#currentScene = scene
      this.#currentNode = node
    }

    return setScene
  }

  async setScene(scene: string | null) {
    this.#currentNode?.destroy()

    this.#currentScene = null
    this.#currentNode = null

    if (scene == null) return

    if (!this.#scenes.has(scene))
      throw new Error(`Scene ${scene}does not exist.`)

    this.#currentScene = scene
    this.#currentNode = await this.#scenes.get(scene)!.load()
  }

  get currentScene() {
    return this.#currentScene
  }

  get currentNode() {
    return this.#currentNode
  }
}
