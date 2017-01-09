/* global Vrh, Kocka, Crtac */

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

const centar = new Vrh(0, visina / 2, 0)
const kocka = new Kocka(centar, visina / 2)
const crtac = new Crtac(platno)

/** FUNKCIJE **/

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
  crtac.crtaLica2(kocka.lica, perspektiva)
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
  crtac.crtaLica2(kocka.lica, perspektiva)
}

/** EXEC **/

crtac.crtaLica2(kocka.lica, perspektiva)

/** EVENTS **/

platno.addEventListener('mousedown', pocniVuchu)
document.addEventListener('mousemove', pratiMisha)
document.addEventListener('mouseup', () => mishStisnut = false)

if (perspektiva) platno.addEventListener('DOMMouseScroll', zumiraj)
