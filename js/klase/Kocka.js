/* global Vrh */

/*
  @param centar: Vector3 object
  @param duzinaStrane: number
*/
class Kocka {
  constructor(centar, duzinaStrane) {
    const pola = duzinaStrane / 2
    this.vrhovi = [
      new Vrh(centar.x - pola, centar.y - pola, centar.z + pola),
      new Vrh(centar.x - pola, centar.y - pola, centar.z - pola),
      new Vrh(centar.x + pola, centar.y - pola, centar.z - pola),
      new Vrh(centar.x + pola, centar.y - pola, centar.z + pola),
      new Vrh(centar.x + pola, centar.y + pola, centar.z + pola),
      new Vrh(centar.x + pola, centar.y + pola, centar.z - pola),
      new Vrh(centar.x - pola, centar.y + pola, centar.z - pola),
      new Vrh(centar.x - pola, centar.y + pola, centar.z + pola)
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
