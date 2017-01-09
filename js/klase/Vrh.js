class Vrh2D {
  constructor (x, y) {
    this.x = parseFloat(x)
    this.y = parseFloat(y)
  }
}

class Vrh extends Vrh2D {
  constructor(x, y, z) {
    super(x, y)
    this.z = parseFloat(z)
  }
}
