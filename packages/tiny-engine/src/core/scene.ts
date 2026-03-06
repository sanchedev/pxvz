import type { Node } from '../nodes/node.js'

export class Scene {
  static accLoad: Promise<void>[] | undefined = undefined

  constructor(public render: () => Node) {}

  async load() {
    Scene.accLoad = []

    const node = this.render()

    let counter = 0
    const loads = Scene.accLoad.map((p) => {
      return (async () => {
        await p
        counter++
        console.log(`Loaded ${counter}/${loads!.length} assets.`)
      })()
    })

    Scene.accLoad = undefined

    await Promise.all(loads)

    return node
  }
}
