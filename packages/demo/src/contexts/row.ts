import { createContext } from 'tiny-engine/hooks'

interface RowContext {
  spawnProjectile(jsx: JSX.Element): void
  spawnPlant(jsx: JSX.Element): void
  spawnZombie(jsx: JSX.Element): void
}

export const RowCtx = createContext<RowContext>({
  spawnPlant() {},
  spawnProjectile() {},
  spawnZombie() {},
})
