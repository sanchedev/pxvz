export class Vector2 {
  static get ZERO() {
    return new Vector2(0, 0)
  }
  static get ONE() {
    return new Vector2(1, 1)
  }

  constructor(
    public x: number,
    public y: number,
  ) {}

  clone() {
    return new Vector2(this.x, this.y)
  }

  add(vector2: Vector2): Vector2
  add(num: number): Vector2
  add(arg: Vector2 | number): Vector2 {
    if (arg instanceof Vector2) {
      this.x += arg.x
      this.y += arg.y
    }
    if (typeof arg === 'number') {
      this.x += arg
      this.y += arg
    }

    return this
  }

  toAdded(vector2: Vector2): Vector2
  toAdded(num: number): Vector2
  toAdded(arg: Vector2 | number): Vector2 {
    const vector2 = this.clone()
    if (arg instanceof Vector2) {
      vector2.x += arg.x
      vector2.y += arg.y
    }
    if (typeof arg === 'number') {
      vector2.x += arg
      vector2.y += arg
    }

    return vector2
  }

  subtract(vector2: Vector2): Vector2
  subtract(num: number): Vector2
  subtract(arg: Vector2 | number): Vector2 {
    if (arg instanceof Vector2) {
      this.x -= arg.x
      this.y -= arg.y
    }
    if (typeof arg === 'number') {
      this.x -= arg
      this.y -= arg
    }

    return this
  }

  toSubtracted(vector2: Vector2): Vector2
  toSubtracted(num: number): Vector2
  toSubtracted(arg: Vector2 | number): Vector2 {
    const vector2 = this.clone()
    if (arg instanceof Vector2) {
      vector2.x -= arg.x
      vector2.y -= arg.y
    }
    if (typeof arg === 'number') {
      vector2.x -= arg
      vector2.y -= arg
    }

    return vector2
  }
}
