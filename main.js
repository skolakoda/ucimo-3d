/* global Vrh2D, Vrh3D, Kocka */

/** KONFIG **/

let perspektiva = 0 // razlicito od nule perspectiva, inace ortogonalno
let prosloMishX = 0
let prosloMishY = 0
let mishStisnut = false

/** INIT **/

const platno = document.getElementById('canvas')
platno.width = document.body.clientWidth
platno.height = document.body.clientHeight

const podloga = platno.getContext('2d')
podloga.strokeStyle = 'rgba(0, 0, 0, 0.3)'
podloga.fillStyle = 'rgba(0, 150, 255, 0.3)'

const centar = new Vrh3D(0, platno.height / 2, 0)
const kocka = new Kocka(centar, platno.height / 2)

/** FUNKCIJE **/

const projektuj = function (vrh3D, perspektiva) {
  if (perspektiva === 0) return new Vrh2D(vrh3D.x, vrh3D.z)
  const mofifikator = perspektiva / vrh3D.y
  return new Vrh2D(mofifikator * vrh3D.x, mofifikator * vrh3D.z)
}

/* @param telo.lica: niz nizova */
const render = function (telo, platno, perspektiva) {
  const podloga = platno.getContext('2d')
  podloga.clearRect(0, 0, platno.width, 2 * platno.height / 2)
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

const rotiraj = function (vrh3D, centar, ugaoVodoravno, ugaoUspravno) {
  // koeficijenti za matricu rotacije
  const ct = Math.cos(ugaoVodoravno)
  const st = Math.sin(ugaoVodoravno)
  const cp = Math.cos(ugaoUspravno)
  const sp = Math.sin(ugaoUspravno)

  // rotacija
  const x = vrh3D.x - centar.x
  const y = vrh3D.y - centar.y
  const z = vrh3D.z - centar.z

  vrh3D.x = ct * x - st * cp * y + st * sp * z + centar.x
  vrh3D.y = st * x + ct * cp * y - ct * sp * z + centar.y
  vrh3D.z = sp * y + cp * z + centar.z
}

const pratiMisha = function (event) {
  if (!mishStisnut) return
  const ugaoVodoravno = (event.clientX - prosloMishX) * Math.PI / 360
  const ugaoUspravno = (event.clientY - prosloMishY) * Math.PI / 180
  for (let i = 0; i < kocka.vrhovi.length; ++i) {
    rotiraj(kocka.vrhovi[i], centar, ugaoVodoravno, ugaoUspravno)
  }
  azurirajMisha(event)
  render(kocka, platno, perspektiva)
}

const pocniVuchu = function (event) {
  azurirajMisha(event)
  mishStisnut = true
}

const azurirajMisha = function (event) {
  prosloMishX = event.clientX
  prosloMishY = event.clientY
}

const zumiraj = function (event) {
  event.preventDefault()
  perspektiva -= event.detail
  render(kocka, platno, perspektiva)
}

/** EXEC **/

render(kocka, platno, perspektiva)

/** EVENTS **/

platno.addEventListener('mousedown', pocniVuchu)

document.addEventListener('mousemove', pratiMisha)

document.addEventListener('mouseup', () => mishStisnut = false)

if (perspektiva) platno.addEventListener('DOMMouseScroll', zumiraj)
