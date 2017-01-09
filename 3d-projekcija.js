/** * KLASE ***/

class Vrh2D {
  constructor (x, y) {
    this.x = parseFloat(x)
    this.y = parseFloat(y)
  };
}

class Vrh3D extends Vrh2D {
  constructor(x, y, z) {
    super(x, y)
    this.z = parseFloat(z)
  }
}

class Kocka {
  constructor(centar, side) {
    var polaStrane = side / 2
    this.vrhovi = [
      new Vrh3D(centar.x - polaStrane, centar.y - polaStrane, centar.z + polaStrane),
      new Vrh3D(centar.x - polaStrane, centar.y - polaStrane, centar.z - polaStrane),
      new Vrh3D(centar.x + polaStrane, centar.y - polaStrane, centar.z - polaStrane),
      new Vrh3D(centar.x + polaStrane, centar.y - polaStrane, centar.z + polaStrane),
      new Vrh3D(centar.x + polaStrane, centar.y + polaStrane, centar.z + polaStrane),
      new Vrh3D(centar.x + polaStrane, centar.y + polaStrane, centar.z - polaStrane),
      new Vrh3D(centar.x - polaStrane, centar.y + polaStrane, centar.z - polaStrane),
      new Vrh3D(centar.x - polaStrane, centar.y + polaStrane, centar.z + polaStrane)
    ]

    // svaka stranica kocke je niz sa četiri vrha
    this.stranice = [
      [this.vrhovi[0], this.vrhovi[1], this.vrhovi[2], this.vrhovi[3]],
      [this.vrhovi[3], this.vrhovi[2], this.vrhovi[5], this.vrhovi[4]],
      [this.vrhovi[4], this.vrhovi[5], this.vrhovi[6], this.vrhovi[7]],
      [this.vrhovi[7], this.vrhovi[6], this.vrhovi[1], this.vrhovi[0]],
      [this.vrhovi[7], this.vrhovi[0], this.vrhovi[3], this.vrhovi[4]],
      [this.vrhovi[1], this.vrhovi[6], this.vrhovi[5], this.vrhovi[2]]
    ]
  }
}


/** * FUNKCIJE ***/

const projektuj = function (vrh3D, perspektiva) {
  if (perspektiva === 0) return new Vrh2D(vrh3D.x, vrh3D.z)
  var r = perspektiva / vrh3D.y
  return new Vrh2D(r * vrh3D.x, r * vrh3D.z)
}

// predmet.stranice je niz nizova
const render = function (predmet, podloga, centarPlatnaX, centarPlatnaY, perspektiva) {
  podloga.clearRect(0, 0, 2 * centarPlatnaX, 2 * centarPlatnaY)
  for (var i = 0; i < predmet.stranice.length; ++i) {
    var tekucaStranica = predmet.stranice[i]

    var vrh2D = projektuj(tekucaStranica[0], perspektiva)
    podloga.beginPath()
    podloga.moveTo(vrh2D.x + centarPlatnaX, -vrh2D.y + centarPlatnaY)

    for (var j = 1; j < tekucaStranica.length; ++j) {
      vrh2D = projektuj(tekucaStranica[j], perspektiva)
      podloga.lineTo(vrh2D.x + centarPlatnaX, -vrh2D.y + centarPlatnaY)
    }
    podloga.closePath()
    podloga.stroke()
    podloga.fill()
  }
}
