/* global Vrh2D */

class Crtac {
  constructor(platno) {
    this.platno = platno
    this.podloga = platno.getContext('2d')
  }

  crtaVrhove (vrhovi){
    this.podloga.clearRect(0, 0, this.platno.width, this.platno.height)
    this.podloga.beginPath()
    this.podloga.moveTo(vrhovi[0].x, vrhovi[0].y)
    for (var i = 0; i < vrhovi.length; i++) {
      this.podloga.lineTo(vrhovi[i].x, vrhovi[i].y)
    }
    this.podloga.stroke()
  }

  /*
   @param lica: niz nizova
   'lica' can be anything (square, triangle, dodecagon): they just need to be arrays of vertices.
   uproscena metoda, ne prati mish lepo.
  */
  crtaLica(lica) {
    this.podloga.clearRect(0, 0, this.platno.width, this.platno.height)
    for (let i = 0; i < lica.length; ++i) {
      const lice = lica[i]
      this.podloga.beginPath()
      this.podloga.moveTo(lice[0].x, lice[0].y)
      for (let j = 1; j < lice.length; ++j) {
        this.podloga.lineTo(lice[j].x, lice[j].y)
      }
      this.podloga.closePath()
      this.podloga.stroke()
      this.podloga.fill()
    }
  }

  crtaLica2(lica, perspektiva) {
    const sirina = this.platno.width
    const visina = this.platno.height
    this.podloga.clearRect(0, 0, sirina, visina)
    for (let i = 0; i < lica.length; ++i) {
      const lice = lica[i]
      const prviVrh = perspektiva ? this.projektuj(lice[0], perspektiva) : lice[0]
      this.podloga.beginPath()
      // koristimo -y jer nisu isti koordinatni sistemi za model i platno
      this.podloga.moveTo(prviVrh.x + sirina / 2, -prviVrh.y + visina / 2)
      for (let j = 1; j < lice.length; ++j) {
        const vrh = perspektiva ? this.projektuj(lice[j], perspektiva) : lice[j]
        this.podloga.lineTo(vrh.x + sirina / 2, -vrh.y + visina / 2)
      }
      this.podloga.closePath()
      this.podloga.stroke()
      this.podloga.fill()
    }
  }

  projektuj(vrh, perspektiva) {
    if (perspektiva === 0) return new Vrh2D(vrh.x, vrh.z)
    const mofifikator = perspektiva / vrh.y
    return new Vrh2D(mofifikator * vrh.x, mofifikator * vrh.z)
  }
}
