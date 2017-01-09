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
   uproscena, ne prati mish lepo
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
    this.podloga.clearRect(0, 0, this.platno.width, this.platno.height)
    for (let i = 0; i < lica.length; ++i) {
      const lice = lica[i]
      const prviVrh = perspektiva ? this.projektuj(lice[0], perspektiva) : lice[0]
      this.podloga.beginPath()
      this.podloga.moveTo(prviVrh.x + this.platno.width / 2, -prviVrh.y + this.platno.height / 2)
      for (let j = 1; j < lice.length; ++j) {
        const vrh2D = perspektiva ? this.projektuj(lice[j], perspektiva) : lice[j]
        this.podloga.lineTo(vrh2D.x + this.platno.width / 2, -vrh2D.y + this.platno.height / 2)
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
