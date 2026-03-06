import { jsx, type TinyComponent } from '../jsx-runtime.js'

type RenderComponent = TinyComponent | Promise<TinyComponent>

export class Scene {
  constructor(public render: () => RenderComponent) {}

  async load() {
    const node = await this.render()

    return jsx(node, {})
  }
}
