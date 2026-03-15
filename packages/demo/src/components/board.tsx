import { Vector2 } from 'tiny-engine'
import { Row } from './row.js'
import { BoardCtx } from '../contexts/board.js'

export function Board() {
  return (
    <BoardCtx.Provider
      value={{
        cellSize: new Vector2(16, 16),
        cellsCount: new Vector2(9, 5),
      }}>
      <node position={new Vector2(40, 24)}>
        {Array.from({ length: 1 }, (_, i) => (
          <Row row={i + 1} />
        ))}
      </node>
    </BoardCtx.Provider>
  )
}
