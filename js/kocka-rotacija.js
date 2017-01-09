/* global Vrh, Kocka */

/** KONFIG **/

const brzina = 0.01
const sirina = document.body.clientWidth
const visina = document.body.clientHeight

let prosliMishX = 0
let prosliMishY = 0
let mishStisnut = false

/** INIT **/

const centar = new Vrh(sirina / 2, visina / 2, 0)
const kocka = new Kocka(centar, visina / 2)

const platno = document.getElementById('canvas')
platno.width = sirina
platno.height = visina

const podloga = platno.getContext('2d')
podloga.strokeStyle = 'rgba(0, 0, 0, 0.3)'
podloga.fillStyle = 'rgba(0, 150, 255, 0.3)'

/** FUNKCIJE **/

/* @param lica: niz nizova */
const render = lica => {
  podloga.clearRect(0, 0, sirina, visina)
  for (let i = 0; i < lica.length; ++i) {
    const lice = lica[i]
    podloga.beginPath()
    podloga.moveTo(lice[0].x, lice[0].y)
    for (let j = 1; j < lice.length; ++j) {
      podloga.lineTo(lice[j].x, lice[j].y)
    }
    podloga.closePath()
    podloga.stroke()
    podloga.fill()
  }
}

const rotiraj = function (vrh, centar, pomakX, pomakY) {
  // koeficijenti za matricu rotacije
  const cosX = Math.cos(pomakX)
  const sinX = Math.sin(pomakX)
  const cosY = Math.cos(pomakY)
  const sinY = Math.sin(pomakY)

  // rotacija
  const x = vrh.x - centar.x
  const y = vrh.y - centar.y
  const z = vrh.z - centar.z

  vrh.x = cosX * x - sinX * cosY * y + sinX * sinY * z + centar.x
  vrh.y = sinX * x + cosX * cosY * y - cosX * sinY * z + centar.y
  vrh.z = sinY * y + cosY * z + centar.z
}

const pratiMisha = function (e) {
  if (!mishStisnut) return
  const pomakX = (e.clientX - prosliMishX) * brzina
  const pomakY = (e.clientY - prosliMishY) * brzina
  for (let i = 0; i < kocka.vrhovi.length; ++i) {
    rotiraj(kocka.vrhovi[i], centar, pomakX, pomakY)
  }
  azurirajMisha(e)
  render(kocka.lica)
}

const pocniVuchu = function (e) {
  azurirajMisha(e)
  mishStisnut = true
}

const azurirajMisha = function (e) {
  prosliMishX = e.clientX
  prosliMishY = e.clientY
}

/** EXEC **/

render(kocka.lica)

/** EVENTS **/

platno.addEventListener('mousedown', pocniVuchu)

document.addEventListener('mousemove', pratiMisha)

document.addEventListener('mouseup', () => mishStisnut = false)
