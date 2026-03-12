import { Vector2 } from 'tiny-engine'
import { Row } from './row.js'

export function Board() {
  return (
    <node position={new Vector2(40, 24)}>
      {Array.from({ length: 1 }, (_, i) => (
        <Row row={i + 1} />
      ))}
    </node>
  )
}
