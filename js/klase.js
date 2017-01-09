/** KLASE **/

class Vrh2D {
  constructor (x, y) {
    this.x = parseFloat(x)
    this.y = parseFloat(y)
  }
}

class Vrh3D extends Vrh2D {
  constructor(x, y, z) {
    super(x, y)
    this.z = parseFloat(z)
  }
}

/*
  @param: centar Vector3
*/
class Kocka {
  constructor(centar, duzinaStrane) {
    const pola = duzinaStrane / 2
    this.vrhovi = [
      new Vrh3D(centar.x - pola, centar.y - pola, centar.z + pola),
      new Vrh3D(centar.x - pola, centar.y - pola, centar.z - pola),
      new Vrh3D(centar.x + pola, centar.y - pola, centar.z - pola),
      new Vrh3D(centar.x + pola, centar.y - pola, centar.z + pola),
      new Vrh3D(centar.x + pola, centar.y + pola, centar.z + pola),
      new Vrh3D(centar.x + pola, centar.y + pola, centar.z - pola),
      new Vrh3D(centar.x - pola, centar.y + pola, centar.z - pola),
      new Vrh3D(centar.x - pola, centar.y + pola, centar.z + pola)
    ]

    // svako lice je niz četiri vrha
    this.lica = [
      [this.vrhovi[0], this.vrhovi[1], this.vrhovi[2], this.vrhovi[3]],
      [this.vrhovi[3], this.vrhovi[2], this.vrhovi[5], this.vrhovi[4]],
      [this.vrhovi[4], this.vrhovi[5], this.vrhovi[6], this.vrhovi[7]],
      [this.vrhovi[7], this.vrhovi[6], this.vrhovi[1], this.vrhovi[0]],
      [this.vrhovi[7], this.vrhovi[0], this.vrhovi[3], this.vrhovi[4]],
      [this.vrhovi[1], this.vrhovi[6], this.vrhovi[5], this.vrhovi[2]]
    ]
  }
}
