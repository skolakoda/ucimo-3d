/* global Vrh2D, Vrh3D, Kocka */

/** KONFIG **/

const brzina = 0.01
const sirina = document.body.clientWidth
const visina = document.body.clientHeight

let perspektiva = 200 // razlicito od nule perspectiva, inace ortogonalno
let prosliMishX = 0
let prosliMishY = 0
let mishStisnut = false

/** INIT **/

const platno = document.getElementById('canvas')
platno.width = sirina
platno.height = visina

const podloga = platno.getContext('2d')
podloga.strokeStyle = 'rgba(0, 0, 0, 0.3)'
podloga.fillStyle = 'rgba(0, 150, 255, 0.3)'

const centar = new Vrh3D(0, platno.height / 2, 0)
const kocka = new Kocka(centar, visina / 2)

/** FUNKCIJE **/

const projektuj = function (vrh, perspektiva) {
  if (perspektiva === 0) return new Vrh2D(vrh.x, vrh.z)
  const mofifikator = perspektiva / vrh.y
  return new Vrh2D(mofifikator * vrh.x, mofifikator * vrh.z)
}

/* @param telo.lica: niz nizova */
const render = function (telo, platno, perspektiva) {
  const podloga = platno.getContext('2d')
  podloga.clearRect(0, 0, platno.width, platno.height)
  for (let i = 0; i < telo.lica.length; ++i) {
    const lice = telo.lica[i]
    let vrh2D = projektuj(lice[0], perspektiva)
    podloga.beginPath()
    podloga.moveTo(vrh2D.x + platno.width / 2, -vrh2D.y + platno.height / 2)
    for (let j = 1; j < lice.length; ++j) {
      vrh2D = projektuj(lice[j], perspektiva)
      podloga.lineTo(vrh2D.x + platno.width / 2, -vrh2D.y + platno.height / 2)
    }
    podloga.closePath()
    podloga.stroke()
    podloga.fill()
  }
}

const rotiraj = function (vrh, centar, pomakX, pomakY) {
  // koeficijenti za matricu rotacije
  const ct = Math.cos(pomakX)
  const st = Math.sin(pomakX)
  const cp = Math.cos(pomakY)
  const sp = Math.sin(pomakY)

  // rotacija
  const x = vrh.x - centar.x
  const y = vrh.y - centar.y
  const z = vrh.z - centar.z

  vrh.x = ct * x - st * cp * y + st * sp * z + centar.x
  vrh.y = st * x + ct * cp * y - ct * sp * z + centar.y
  vrh.z = sp * y + cp * z + centar.z
}

const pratiMisha = function (e) {
  if (!mishStisnut) return
  const pomakX = (e.clientX - prosliMishX) * brzina
  const pomakY = (e.clientY - prosliMishY) * brzina
  for (let i = 0; i < kocka.vrhovi.length; ++i) {
    rotiraj(kocka.vrhovi[i], centar, pomakX, pomakY)
  }
  azurirajMisha(e)
  render(kocka, platno, perspektiva)
}

const pocniVuchu = function (e) {
  azurirajMisha(e)
  mishStisnut = true
}

const azurirajMisha = function (e) {
  prosliMishX = e.clientX
  prosliMishY = e.clientY
}

const zumiraj = function (e) {
  e.preventDefault()
  perspektiva -= e.detail
  render(kocka, platno, perspektiva)
}

/** EXEC **/

render(kocka, platno, perspektiva)

/** EVENTS **/

platno.addEventListener('mousedown', pocniVuchu)

document.addEventListener('mousemove', pratiMisha)

document.addEventListener('mouseup', () => mishStisnut = false)

if (perspektiva) platno.addEventListener('DOMMouseScroll', zumiraj)
