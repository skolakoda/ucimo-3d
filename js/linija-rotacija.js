/* global Vrh, Crtac */

/** KONFIG **/

const brzina = 0.01
const sirina = document.body.clientWidth
const visina = document.body.clientHeight

let prosliMishX = 0
let prosliMishY = 0
let mishStisnut = false

/** INIT **/

const centar = new Vrh(sirina / 2, visina / 2, 0)
const A = new Vrh(10, 100, 0)
const B = new Vrh(400, 200, 0)
const C = new Vrh(600, 300, 0)
const vrhovi = [A, B, C]

const platno = document.getElementById('canvas')
platno.width = sirina
platno.height = visina

const podloga = platno.getContext('2d')
podloga.strokeStyle = 'rgba(0, 0, 0, 0.3)'
podloga.fillStyle = 'rgba(0, 150, 255, 0.3)'

const crtac = new Crtac(platno)

/** FUNKCIJE **/

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

  vrh.x = (cosX * x) - (sinX * cosY * y) + (sinX * sinY * z) + centar.x
  vrh.y = (sinX * x) + (cosX * cosY * y) - (cosX * sinY * z) + centar.y
  vrh.z = (sinY * y) + (cosY * z) + centar.z
}

const pratiMisha = e => {
  if (!mishStisnut) return
  const pomakX = (e.clientX - prosliMishX) * brzina
  const pomakY = (e.clientY - prosliMishY) * brzina
  for (let i = 0; i < vrhovi.length; ++i) {
    rotiraj(vrhovi[i], centar, pomakX, pomakY)
  }
  azurirajMisha(e)
  crtac.crtaVrhove(vrhovi)
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

crtac.crtaVrhove(vrhovi)

/** EVENTS **/

platno.addEventListener('mousedown', pocniVuchu)
document.addEventListener('mousemove', pratiMisha)
document.addEventListener('mouseup', () => mishStisnut = false)
